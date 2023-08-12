import { Button, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { ConnectionCategories, colorsByDifficulty, normalizeCategories, validateCategories } from "./ConnectionsPlay";
import { useLocation, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import './connections.scss';
import Title from "antd/es/typography/Title";
import { UploadOutlined, CaretRightOutlined } from '@ant-design/icons';
import { RcFile } from "antd/es/upload";

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

export const ConnectionsForm = () => {
    const location = useLocation();
    const [categories, setCategories] = useState<ConnectionCategories>(location.state?.categories || defaultCategories);
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

    const generateLink = (categories: ConnectionCategories): string => {
        const jsonString = JSON.stringify(categories);
        const encodedBase64String = encodeURIComponent(btoa(jsonString));
        return `/connections-play?categories=${encodedBase64String}`;
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "36px 12px", maxWidth: "768px", width: "100%" }}>
                <Form
                    style={{ color: "black", padding: "0 12px" }}
                    {...formItemLayout}
                    labelCol={{ flex: '64px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}>

                    <Title level={1} style={{ marginTop: 0, marginBottom: 0 }}>Connections</Title>

                    {
                        categories.map((category, index) => (
                            <div key={index} >
                                <Title level={4} style={{ color: colorsByDifficulty[index] }}>{difficulties[index]}</Title>

                                <Form.Item label="Title">
                                    <Input
                                        type="text"
                                        value={category.description}
                                        onChange={(event) => {
                                            const newCategories = [...categories];
                                            newCategories[index].description = event.target.value;
                                            setCategories(newCategories);
                                        }}
                                        placeholder="Name this category"
                                    />
                                </Form.Item>

                                <WordsInput
                                    label="Words"
                                    value={listToString(category.words)}
                                    onChange={(e) => {
                                        const words: string[] = stringToList(e)
                                        const newCategories = [...categories];
                                        newCategories[index].words = words;
                                        setCategories(newCategories);
                                    }}
                                />
                            </div>
                        ))
                    }

                    <Button
                        style={{ marginTop: "24px" }}
                        className="button with-margin"
                        icon={<CaretRightOutlined />}
                        disabled={!validateCategories(categories)}
                        onClick={() => {
                            const valid = validateCategories(categories);
                            if (valid) {
                                const normalized = normalizeCategories(categories);
                                const link = generateLink(normalized);
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

type WordsInputProps = {
    label: string,
    value: string,
    onChange: (s: string) => void,
}

const WordsInput = ({ label, value, onChange }: WordsInputProps) => {
    const [valueList, setValueList] = useState(stringToList(value));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const wordlist = stringToList(value);
        if (wordlist.every(w => w.length > 0)) {
            setValueList(wordlist);
        }
        if (!shouldShowError()) {
            setError(null);
        }
    }, [value])

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
            placeholder="Four comma-separated words"
        />
    </Form.Item>
}
