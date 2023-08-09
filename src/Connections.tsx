import { Button } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { DownloadOutlined, BackwardOutlined } from '@ant-design/icons';

type ConnectionCategory = {
    description: string;
    id: number;
    words: string[];
    solved?: boolean;
}

export type ConnectionCategories = ConnectionCategory[];

const correctFontSize = (str: string, elementWidth: number) => {
    const originalSize = 16;
    const length = str.length;
    const mult = elementWidth / (originalSize * length);
    let fontSize = originalSize * mult * 2.5;
    if (fontSize > originalSize) fontSize = originalSize;
    return Math.round(fontSize);
};

const Box = ({ word, selected, solved, onClick }: { word: string, selected: boolean, solved: boolean, onClick: () => void }) => {
    return <Button
        onClick={onClick}
        type={selected ? "primary" : "default"}
        disabled={solved}
        style={{
            minWidth: '50px', padding: '2px', height: "72px", margin: "4px", overflow: "hidden", fontSize: correctFontSize(word, 50),
        }}>
        {word}
    </Button>
}

type WordState = {
    solved: boolean;
    index: number;
}

type RecordedGuess = {
    words: string[];
    correct: boolean;
    off: number
}

export const WordsContainer = ({ connections }: { connections: ConnectionCategories }) => {
    const sortedConnections = connections.sort((a, b) => a.id - b.id).map((c) => ({ ...c, words: c.words.map((w) => w.toUpperCase()) }));
    const allWords: { [key: string]: WordState } = {};
    const wordArr: string[] = [];
    for (const connection of sortedConnections) {
        for (const word of connection.words) {
            allWords[word] = { solved: false, index: connection.id };
            wordArr.push(word);
        }
    }

    const categoryMap: { [id: number]: ConnectionCategory } = {};
    for (const category of sortedConnections) {
        categoryMap[category.id] = category;
    }

    const [wordOrder, setWordOrder] = useState<string[]>(shuffleArray(wordArr));
    const [wordState, setWordState] = useState<{ [key: string]: WordState }>(allWords);
    const [categoriesState, setCategoriesState] = useState(categoryMap);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [guesses, setGuesses] = useState<RecordedGuess[]>([]);
    const navigate = useNavigate();

    const checkIfSolved = () => {
        if (selectedWords.length === 4) {
            const firstWord = selectedWords[0];
            const index = wordState[firstWord].index;
            const solved = selectedWords.every(word => wordState[word].index === index);

            const newMap = { ...wordState };
            if (solved) {
                for (const word of selectedWords) {
                    newMap[word].solved = true;
                    setWordState(newMap);
                }
                const newCategoryState = { ...categoriesState };
                newCategoryState[index].solved = true;
                setCategoriesState(newCategoryState);
                console.log("solved");
                if (newCategoryState[index].solved) {
                    const allSolved = Object.values(newCategoryState).every(category => category.solved);
                    if (allSolved) {
                        console.log("all solved");
                    }
                }
            } else {
                console.log("reset");
            }

            setGuesses([...guesses, { words: selectedWords, correct: solved, off: 0 }]);
            setSelectedWords([]);
        }
    }

    const serializeAndDownloadCSV = () => {
        const c = sortedConnections.map(({ description, words }) => ([description, ...words]));
        const csv = Papa.unparse(c);
        const blob = new Blob([csv], { type: 'text/csv' });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'connections.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    const onClick = (word: string) => {
        if (selectedWords.includes(word)) {
            setSelectedWords(selectedWords.filter(w => w !== word));
            return;
        }

        if (selectedWords.length === 4) {
            return;
        }

        setSelectedWords([...selectedWords, word]);
    }

    return (
        <div style={{ padding: "48px calc(20px + (100vw - 400px) * 0.3)" }}>
            {
                Object.entries(categoriesState).map(([key, value]) => {
                    if (!value.solved) {
                        return null;
                    }

                    return (
                        <div
                            style={{
                                color: "black",
                                border: "1px solid black",
                                borderRadius: "8px",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                height: "64px",
                                margin: "4px"
                            }}
                            key={key}>
                            <div>{value.description}</div>
                            <div>{value.words.join(", ")}</div>
                        </div>
                    )
                })
            }

            <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr", marginBottom: "36px" }}>
                {
                    wordOrder.map((word, index) => {
                        if (wordState[word].solved) {
                            return null;
                        }

                        return <Box
                            key={index}
                            onClick={() => onClick(word)}
                            word={word}
                            selected={selectedWords.includes(word)}
                            solved={wordState[word].solved}
                        />
                    })
                }
            </div>

            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginBottom: '24px' }} >
                <Button className="button with-margin" type="primary" onClick={() => checkIfSolved()} disabled={selectedWords.length !== 4}>
                    Submit
                </Button>

                <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                    <Button className="button with-margin" onClick={() => setWordOrder(shuffleArray(wordOrder))}>
                        Shuffle
                    </Button>

                    <Button className="button with-margin" onClick={() => setSelectedWords([])}>
                        Deselect all
                    </Button>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                <Button className="button with-margin" onClick={() => navigate("/connections-create", { state: { categories: sortedConnections } })} icon={<BackwardOutlined />}>
                    Back to create
                </Button>

                <Button className="button with-margin" onClick={() => serializeAndDownloadCSV()} icon={<DownloadOutlined />}>
                    Export as CSV
                </Button>
            </div>

            {
                guesses.map((guess, index) => <div key={index} style={{ color: guess.correct ? 'green' : 'black' }}>{guess.words.join(", ")}</div>)
            }
        </div >
    )
}

function shuffleArray(array: string[]): string[] {
    const shuffledArray = [...array]; // Create a copy of the original array

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index

        // Swap elements at i and j
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

const decodeCategories = (encodedValue: string | null): ConnectionCategory[] | null => {
    if (!encodedValue) {
        return null;
    }

    let parsedConnections;
    try {
        const decodedConnections = atob(decodeURIComponent(encodedValue));
        parsedConnections = JSON.parse(decodedConnections);
    } catch {
        return null;
    }

    if (!validateCategories(parsedConnections)) {
        return null;
    }

    return parsedConnections;
}

const validateCategories = (categories: ConnectionCategory[]): boolean => {
    return categories?.every((cat: any) => cat.id && cat.description && cat.words?.length === 4)
}

export const Test = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let connections: ConnectionCategory[] = [];
    const urlCategories = decodeCategories(searchParams.get('categories'));
    if (urlCategories) {
        connections = urlCategories;
    } else if (location.state?.categories && validateCategories(location.state.categories)) {
        connections = location.state.categories;
    } else {
        connections = [
            {
                description: "test1",
                id: 1,
                words: ["test1", "test2", "test3", "test4"]
            },
            {
                description: "test2",
                id: 2,
                words: ["test5", "test6", "test7", "test8"]
            },
            {
                description: "test3",
                id: 3,
                words: ["test9", "test10", "Reminisce", "Californiacation"]
            },
            {
                description: "test4",
                id: 4,
                words: ["test13", "test14", "test15", "test16"]
            }
        ]
    }

    return <WordsContainer connections={connections} />
}
