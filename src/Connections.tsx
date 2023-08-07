import { useState } from "react";

type ConnectionCategory = {
    description: string;
    id: number;
    words: string[];
}

type ConnectionCategories = ConnectionCategory[];

const Box = ({ word, solved }: { word: string, solved: boolean }) => {
    return <div>{word} {solved}</div>
}

type WordState = {
    solved: boolean;
    index: number;
}

export const WordsContainer = ({ connections }: { connections: ConnectionCategories }) => {
    const sortedConnections = connections.sort((a, b) => a.id - b.id);
    const allWords: { [key: string]: WordState } = {};
    const wordOrder = []
    for (const connection of sortedConnections) {
        for (const word of connection.words) {
            allWords[word] = { solved: false, index: connection.id };
            wordOrder.push(word);
        }
    }

    const [wordState, setWordState] = useState<{ [key: string]: WordState }>(allWords);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);

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
        }

        setSelectedWords([]);
    }



    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                {
                    wordOrder.slice(0, 4).map(word => <Box word={word} solved={wordState[word].solved} />)
                }
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                {
                    wordOrder.slice(4, 8).map(word => <Box word={word} solved={wordState[word].solved} />)
                }
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                {
                    wordOrder.slice(8, 12).map(word => <Box word={word} solved={wordState[word].solved} />)
                }
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                {
                    wordOrder.slice(12, 16).map(word => <Box word={word} solved={wordState[word].solved} />)
                }
            </div>
        </>
    )
}
