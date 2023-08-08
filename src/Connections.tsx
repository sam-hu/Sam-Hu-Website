import { Button } from "antd";
import { useEffect, useState } from "react";

type ConnectionCategory = {
    description: string;
    id: number;
    words: string[];
    solved?: boolean;
}

type ConnectionCategories = ConnectionCategory[];

const Box = ({ word, selected, solved, onClick }: { word: string, selected: boolean, solved: boolean, onClick: () => void }) => {
    return <Button onClick={onClick} type={selected ? "primary" : "default"} disabled={solved} style={{ height: "64px", margin: "4px" }}>
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

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const WordsContainer = ({ connections }: { connections: ConnectionCategories }) => {
    const sortedConnections = connections.sort((a, b) => a.id - b.id);
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

    const checkIfSolved = async () => {
        if (selectedWords.length === 4) {
            await sleep(1000);

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

    useEffect(() => {
        checkIfSolved();
    }, [selectedWords])

    const onClick = (word: string) => {
        if (selectedWords.includes(word)) {
            setSelectedWords(selectedWords.filter(w => w !== word));
        } else {
            setSelectedWords([...selectedWords, word]);
        }
    }

    return (
        <>
            {
                Object.entries(categoriesState).map(([key, value]) => {
                    if (!value.solved) {
                        return null;
                    }

                    return (
                        <div
                            style={{
                                color: "white",
                                border: "1px solid white",
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

            <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
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

            <Button onClick={() => {
                setWordOrder(shuffleArray(wordOrder));
            }}>
                Shuffle
            </Button>

            <Button onClick={() => {
                setSelectedWords([]);
            }}>
                Deselect all
            </Button>

            {
                guesses.map((guess, index) => <div key={index} style={{ color: guess.off === 0 ? 'green' : 'white' }}>{guess.words.join(", ")}</div>)
            }
        </>
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

export const Test = () => <WordsContainer connections={[
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
        words: ["test9", "test10", "test11", "test12"]
    },
    {
        description: "test4",
        id: 4,
        words: ["test13", "test14", "test15", "test16"]
    }
]} />
