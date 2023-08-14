import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import Papa from 'papaparse';
import { DownloadOutlined, CaretLeftOutlined, ShareAltOutlined } from '@ant-design/icons';
import Title from "antd/es/typography/Title";

type ConnectionCategory = {
    description: string;
    id: number;
    words: string[];
    solved?: boolean;
}

export type ConnectionCategories = ConnectionCategory[];

const correctFontSize = (str: string, elementWidth: number, originalSize = 16) => {
    const length = str.length;
    const mult = elementWidth / (originalSize * length);
    let fontSize = originalSize * mult * 2.5;
    if (fontSize > originalSize) fontSize = originalSize;
    return Math.round(fontSize);
};

const correctFontSizeForAnswers = (guess: string[]) => {
    return correctFontSize(guess.join(", "), isMobile() ? 200 : 300, 14)
}

const minChangesToEqualLists = (list1: string[], list2: string[]): number => {
    const freq1: { [key: string]: number } = {};

    // Count the frequency of strings in list1
    for (const string of list1) {
        freq1[string] = (freq1[string] || 0) + 1;
    }

    // Calculate the total changes needed
    let changesNeeded = 0;

    // Iterate through the strings in list2
    for (const string of list2) {
        if (freq1[string] && freq1[string] > 0) {
            freq1[string] -= 1; // Mark the string as used
        } else {
            changesNeeded += 1; // Count strings that need to be changed
        }
    }

    return changesNeeded;
}

const calcOffBy = (words: string[][], guess: string[]): number => {
    let offs = []
    for (const word of words) {
        offs.push(minChangesToEqualLists(word, guess));
    }
    return Math.min(...offs);
}

export const isMobile = () => window.innerWidth < 768;

const Box = ({ word, selected, solved, onClick }: { word: string, selected: boolean, solved: boolean, onClick: () => void }) => {
    return <Button
        className="word-box"
        onClick={onClick}
        type={selected ? "primary" : "default"}
        disabled={solved}
        style={{
            fontSize: correctFontSize(word, isMobile() ? 45 : 75),
        }}>
        {word}
    </Button>
}

type WordState = {
    solved: boolean;
    difficulty: number; // 0, 1, 2, 3
}

type RecordedGuess = {
    words: string[];
    correct: boolean;
    off: number
}

export const colorsByDifficulty = ["#e3bf02", "#84a63a", "#719eeb", "#bd70c4"];
const iconsByDifficulty = ["🟨", "🟩", "🟦", "🟪"];
const bodiedTexts = ["Damn bruh 💀", "Down bad 😔", "Try harder", "Shameful", "So close!", "😬😬😬", "Come on now", "Is that you Prath?"]

export const ConnectionsGame = ({ categories, backTo, debug }: { categories: ConnectionCategories, backTo?: "archive", debug?: boolean }) => {
    const normalizedCategories = normalizeCategories(categories);
    const allWords: { [key: string]: WordState } = {};
    const wordArr: string[] = [];
    const groupedWords: string[][] = [];
    for (const connection of normalizedCategories) {
        groupedWords.push(connection.words);
        for (const word of connection.words) {
            allWords[word] = { solved: false, difficulty: connection.id };
            wordArr.push(word);
        }
    }

    const categoryMap: { [id: number]: ConnectionCategory } = {};
    for (const category of normalizedCategories) {
        categoryMap[category.id] = category;
    }

    const [wordOrder, setWordOrder] = useState<string[]>(debug ? wordArr : shuffleArray(wordArr));
    const [wordState, setWordState] = useState<{ [key: string]: WordState }>(allWords);
    const [categoriesState, setCategoriesState] = useState(categoryMap);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [guesses, setGuesses] = useState<RecordedGuess[]>([]);
    const [copied, setCopied] = useState(false);
    const [victory, setVictory] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [bodiedText, setBodiedText] = useState("");
    const [back, setBack] = useState(backTo);
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        if (searchParams.get("from") === "archive") {
            setBack("archive");
        }
    }, [searchParams])

    const checkIfSolved = () => {
        if (selectedWords.length !== normalizedCategories.length) {
            return;
        }

        const firstWord = selectedWords[0];
        const index = wordState[firstWord].difficulty;
        const solved = selectedWords.every(word => wordState[word].difficulty === index);
        const newMap = { ...wordState };
        const newGuesses = [...guesses, {
            words: selectedWords, correct: solved, off: calcOffBy(groupedWords, selectedWords)
        }]

        if (solved) {
            for (const word of selectedWords) {
                newMap[word].solved = true;
                setWordState(newMap);
            }
            const newCategoryState = { ...categoriesState };
            newCategoryState[index].solved = true;
            setCategoriesState(newCategoryState);
            if (newCategoryState[index].solved) {
                const allSolved = Object.values(newCategoryState).every(category => category.solved);
                if (allSolved) {
                    setVictory(true);
                    setShowModal(true);
                }
            }
            setBodiedText("");
        } else {
            const last3 = newGuesses.slice(-3);
            const bodiedText = newGuesses.length >= 3 && last3.every(g => !g.correct);
            if (bodiedText) {
                setBodiedText(bodiedTexts[Math.floor(Math.random() * bodiedTexts.length)]);
            }
        }

        setGuesses(newGuesses);
        setSelectedWords([]);
    }

    const serializeAndDownloadCSV = () => {
        const c = normalizedCategories.map(({ description, words }) => ([description, ...words]));
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

    const backButton = () => {
        switch (back) {
            case "archive":
                return <Button className="button" onClick={() => navigate("/connections/archive")} icon={<CaretLeftOutlined />}>
                    Back to archive
                </Button>
            default:
                return <Button className="button" onClick={() => navigate("/connections/create", { state: { categories: normalizedCategories } })} icon={<CaretLeftOutlined />}>
                    Edit puzzle
                </Button>
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "36px 12px", maxWidth: "768px", width: "100%" }}>
                {guesses.length > 0 && <VictoryModal guesses={guesses} allWords={allWords} visible={victory && showModal} onClose={() => setShowModal(false)} />}

                {
                    guesses.map((guess, index) => {
                        if (!guess.correct) {
                            return null;
                        }

                        const category = categoryMap[allWords[guess.words[0]].difficulty];
                        return (
                            <>
                                <div
                                    style={{
                                        color: 'white',
                                        backgroundColor: colorsByDifficulty[category.id],
                                        borderRadius: "8px",
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        gap: "4px",
                                        alignItems: "center",
                                        height: "72px",
                                        margin: "0 0 8px",
                                    }}
                                    key={index}>
                                    <strong>{category.description}</strong>
                                    <div style={{ fontSize: correctFontSizeForAnswers(guess.words) }}>{guess.words.join(", ")}</div>
                                </div>
                            </>
                        )
                    })
                }

                <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr", margin: "0 -4px 24px -4px" }}>
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

                {victory
                    ? <Button style={{ height: "54px" }} className="button with-margin" type="primary" onClick={() => setShowModal(true)}>
                        View results
                    </Button>
                    : <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }} >
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
                }

                <div style={{ borderBottom: "1px solid #d9d9d9", marginTop: "24px", marginBottom: "24px" }} />

                {/* Guesses */}
                {guesses.length > 0 && <Title level={4} style={{ display: "flex", justifyContent: "center" }}>
                    Guesses
                </Title>}
                {
                    guesses.map((guess, index) => <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: guess.correct ? colorsByDifficulty[allWords[guess.words[0]].difficulty] : 'darkgray',
                            border: '1px solid',
                            borderRadius: "8px",
                            height: '42px',
                            marginBottom: '8px',
                            color: 'white',
                        }}
                    >
                        <span style={{ margin: "0 24px", fontSize: correctFontSizeForAnswers(guess.words) }}>{guess.words.join(", ")}</span>
                        <span style={{ paddingRight: "24px", minWidth: "64px", display: "flex", justifyContent: "right" }}> {guess.off > 0 ? `${guess.off} off` : "Correct!"}</span>
                    </div>)
                }
                {bodiedText && <div style={{ display: "flex", justifyContent: "center", paddingTop: '8px' }}>{bodiedText}</div>}

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginTop: "36px",
                    width: "100%",
                    backgroundColor: "white",
                }}>
                    <Button
                        className="button with-margin"
                        onClick={() => {
                            if (navigator.share) {
                                const shareData = {
                                    text: window.location.href,
                                };
                                navigator.share(shareData)
                            } else {
                                if (!copied) {
                                    setCopied(true);
                                    setTimeout(() => {
                                        setCopied(false);
                                    }, 2000);
                                }
                                navigator.clipboard.writeText(window.location.href)
                            }
                        }}
                        icon={<ShareAltOutlined />}
                    >
                        {copied ? "Copied to clipboard!" : "Share puzzle"}
                    </Button>
                    <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                        {backButton()}

                        <Button className="button" onClick={() => serializeAndDownloadCSV()} icon={<DownloadOutlined />}>
                            Export as CSV
                        </Button>
                    </div>
                </div>
            </div>
        </div>
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

const decodeCategories = (encodedValue: string | null): ConnectionCategories | null => {
    if (!encodedValue) {
        return null;
    }

    let parsedCategories;
    try {
        const decodedCategories = atob(decodeURIComponent(encodedValue));
        parsedCategories = JSON.parse(decodedCategories);
    } catch {
        return null;
    }

    if (!validateCategories(parsedCategories)) {
        return null;
    }

    return parsedCategories;
}

export const validateCategories = (categories: ConnectionCategories): boolean => {
    return categories?.every((cat) => cat.words?.length === 4 && cat.words.every((word) => word.trim().length > 0))
}

export const normalizeCategories = (categories: ConnectionCategories): ConnectionCategories => {
    for (let i = 0; i < categories.length; i++) {
        const c = categories[i];
        c.id = i;
        c.description = c.description.trim();
        c.words = c.words.map((word) => word.trim().toUpperCase());
    }
    return categories;
}

export const ConnectionsContainer = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let categories: ConnectionCategories = [];
    const urlCategories = decodeCategories(searchParams.get('categories'));
    let debug;
    if (urlCategories) {
        categories = urlCategories;
    } else if (location.state?.categories && validateCategories(location.state.categories)) {
        categories = location.state.categories;
    } else if (searchParams.has('debug')) {
        debug = true
        categories = [
            {
                description: "Test Description 1",
                id: 1,
                words: ["a", "ew", "yaw", "goop"]
            },
            {
                description: "Test Description 2",
                id: 2,
                words: ["Lodge", "Tithed", "awesome", "Hardware"]
            },
            {
                description: "Test Description 3",
                id: 3,
                words: ["beautiful", "beneficial", "adjudicator", "jeopardizing"]
            },
            {
                description: "Test Description 4",
                id: 4,
                words: ["jabberwockies", "abdominoplasty", "objectification", "hieroglyphically"]
            }
        ]
    } else {
        return <Navigate to="/connections" />
    }

    return <ConnectionsGame categories={categories} debug={debug} />
}

const VictoryModal = ({ guesses, allWords, visible, onClose }: { guesses: RecordedGuess[], allWords: { [key: string]: WordState }, visible: boolean, onClose: () => void }) => {
    const [copied, setCopied] = useState(false);
    const guessList = guesses.map((guess) => guess.words.map((word) => iconsByDifficulty[allWords[word].difficulty]).join(""));

    const onShare = () => {
        let text = guessList.join("\n");
        if (guessList.length >= 8) {
            text = text + "\n💀Bodied💀";
        }
        if (navigator.share) {
            const shareData = {
                text: text,
            };
            navigator.share(shareData)
        } else {
            if (!copied) {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            }
            navigator.clipboard.writeText(text)
        }
    }

    const footer = <div style={{ display: "flex", flexDirection: "column", marginTop: "24px" }}>
        <Button className="button with-margin" onClick={onShare} type="primary" icon={<ShareAltOutlined />}>
            {copied ? "Copied to clipboard!" : "Share results"}
        </Button>
        <Button className="button with-margin" onClick={onClose}>
            Close
        </Button>
    </div>

    return <Modal
        open={visible}
        title={<div style={{ fontSize: "24px" }}>Nice!</div>}
        style={{ textAlign: "center" }}
        centered
        onCancel={onClose}
        cancelButtonProps={{ hidden: true }}
        footer={footer}>
        <div style={{ paddingTop: "16px" }}>
            {
                guessList.map((guess, index) => <div key={index} style={{ fontSize: "24px", height: "24px" }}>{guess}</div>)
            }
        </div>
    </Modal>
}
