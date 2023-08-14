import { Button, Form, Input, Upload } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { ConnectionCategories, colorsByDifficulty, normalizeCategories, validateCategories } from "./ConnectionsPlay";
import { useLocation, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import './connections.scss';
import Title from "antd/es/typography/Title";
import { UploadOutlined, CaretRightOutlined, HolderOutlined } from '@ant-design/icons';
import { RcFile } from "antd/es/upload";
import { DragDropContext, DropResult, Draggable, Droppable } from 'react-beautiful-dnd';

const defaultCategories: ConnectionCategories = [
    {
        id: 0,
        description: "",
        words: []
    },
    {
        id: 1,
        description: "",
        words: []
    },
    {
        id: 2,
        description: "",
        words: []
    },
    {
        id: 3,
        description: "",
        words: []
    }
]

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const difficulties = ["Easy", "Medium", "Hard", "Very hard"];

export const generateLink = (categories: ConnectionCategories): string => {
    const jsonString = JSON.stringify(normalizeCategories(categories));
    const encodedBase64String = encodeURIComponent(btoa(jsonString));
    return `/connections/play?categories=${encodedBase64String}`;
}

const reorder = (list: ConnectionCategories, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const ConnectionsForm = () => {
    const location = useLocation();
    const [categories, setCategories] = useState<ConnectionCategories>(location.state?.categories || defaultCategories);
    const [clearInputs, setClearInputs] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.categories) {
            setCategories(location.state.categories);
        }
    }, [location.state?.categories]);

    const handleUpload = (file: RcFile) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = Papa.parse(event.target?.result as string, {
                skipEmptyLines: true,
                header: false, // No header row
            });

            const rows = result.data as string[][];
            const categoriesList: ConnectionCategories = rows.map((row, index) => {
                return { id: index, description: row[0], words: row.slice(1) };
            });
            setCategories(categoriesList);
        }
        reader.readAsText(file);
        return false;
    }

    const onClear = () => {
        setClearInputs(false)
        setCategories([...defaultCategories])
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const newCategories = reorder(
            categories,
            result.source.index,
            result.destination.index
        );

        setCategories(newCategories);
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "36px 12px", maxWidth: "768px", width: "100%" }}>
                <Form
                    style={{ color: "black" }}
                    {...formItemLayout}
                    labelCol={{ flex: '64px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}>

                    <Title level={1} style={{ marginTop: 0, marginBottom: "24px", marginLeft: "8px" }}>Connections</Title>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="list">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {
                                        categories.map((category, index) => (
                                            <Draggable draggableId={category.id.toString()} index={index} key={category.id.toString()}>
                                                {provided => (
                                                    <div
                                                        className="difficulty-draggable"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div style={{
                                                            border: `1px solid ${colorsByDifficulty[index]}`,
                                                            borderRadius: "8px",
                                                            padding: "16px 12px",
                                                            backgroundColor: colorsByDifficulty[index],
                                                        }}>
                                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                <Title level={4} style={{ color: "white", margin: 0, paddingBottom: "4px" }}>{difficulties[index]}</Title>
                                                                <HolderOutlined style={{ fontSize: '18px', color: "white" }} />
                                                            </div>

                                                            <DescriptionInput
                                                                label={<span style={{ color: "white" }}>Title</span>}
                                                                value={category.description}
                                                                placeholder={`Category ${category.id + 1}`}
                                                                onChange={(s) => {
                                                                    const newCategories = [...categories];
                                                                    newCategories[index].description = s;
                                                                    setCategories(newCategories);
                                                                }}
                                                                clear={clearInputs}
                                                                onClear={onClear}
                                                            />

                                                            <WordsInput
                                                                label={<span style={{ color: "white" }}>Words</span>}
                                                                value={listToString(category.words)}
                                                                placeholder="Four comma-separated words"
                                                                onChange={(s) => {
                                                                    const newCategories = [...categories];
                                                                    newCategories[index].words = stringToList(s);
                                                                    setCategories(newCategories);
                                                                }}
                                                                clear={clearInputs}
                                                                onClear={onClear}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <Button
                        style={{ marginTop: "24px" }}
                        className="button with-margin"
                        icon={<CaretRightOutlined />}
                        disabled={!validateCategories(categories)}
                        onClick={() => {
                            const valid = validateCategories(categories);
                            if (valid) {
                                const link = generateLink(categories);
                                navigate(link);
                            }
                        }}
                        type="primary"
                    >
                        Create puzzle
                    </Button>

                    <Upload
                        accept=".csv"
                        maxCount={1}
                        beforeUpload={handleUpload}
                        showUploadList={false}
                    >
                        <Button
                            className="button with-margin"
                            icon={<UploadOutlined />}
                        >
                            Upload CSV
                        </Button>
                    </Upload>

                    <Button
                        className="button with-margin"
                        onClick={() => {
                            setClearInputs(true);
                        }}
                    >
                        Clear all
                    </Button>
                </Form>
            </div>
        </div>
    );
}

const stringToList = (s: string): string[] => {
    if (s.length === 0) {
        return [];
    }
    const split = s.split(",");
    return split
}

const listToString = (list: string[]): string => {
    return list.join(",");
}

type TextInputProps = {
    label: ReactNode,
    value: string,
    placeholder?: string,
    onChange: (s: string) => void,
    clear: boolean,
    onClear: () => void,
}

const DescriptionInput = ({ label, value, placeholder, onChange, clear, onClear }: TextInputProps) => {
    const [valueInBox, setValueInBox] = useState(value);

    useEffect(() => {
        setValueInBox(value);
    }, [value])

    useEffect(() => {
        if (clear) {
            setValueInBox("");
            onClear();
        }
    }, [clear, onClear])

    return < Form.Item label={label} >
        <Input
            type="text"
            value={valueInBox}
            onChange={(e) => {
                onChange(e.target.value);
            }}
            placeholder={placeholder}
        />
    </Form.Item >
}

const WordsInput = ({ label, value, placeholder, onChange, clear, onClear }: TextInputProps) => {
    const [valueList, setValueList] = useState(stringToList(value));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (value.length === 0) {
            setValueList([]);
        }
        const wordlist = stringToList(value);
        if (wordlist.every(w => w.length > 0)) {
            setValueList(wordlist);
        }
        if (!shouldShowError()) {
            setError(null);
        }
    }, [value])

    useEffect(() => {
        if (clear) {
            setValueList([]);
            setError(null);
            onClear();
        }
    }, [clear, onClear])

    const isValid = (): boolean => {
        const list = valueList.map((word) => word.trim());
        return list.length === 4 && list.every((word) => word.length >= 0)
    }

    const shouldShowError = (): boolean => !isValid() && valueList.length > 0;

    const validate = () => {
        if (!shouldShowError()) {
            setError(null);
        } else {
            setError("Input not valid");
        }
    }

    return <Form.Item label={label} validateStatus={error ? "error" : ""} help={error}>
        <Input
            type="text"
            value={listToString(valueList)}
            onChange={e => {
                setValueList(stringToList(e.target.value));
                onChange(e.target.value);
            }}
            onBlur={validate}
            placeholder={placeholder}
        />
    </Form.Item>
}
