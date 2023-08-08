import { Button, Form, Input } from "antd";
import { useState } from "react";
import { ConnectionCategories } from "./Connections";
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

const defaultCategories: ConnectionCategories = [
    {
        id: 1,
        description: "",
        words: ["", "", "", ""]
    },
    {
        id: 2,
        description: "",
        words: ["", "", "", ""]
    },
    {
        id: 3,
        description: "",
        words: ["", "", "", ""]
    },
    {
        id: 4,
        description: "",
        words: ["", "", "", ""]
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

const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
        .then(() => {
            console.log('Copied to clipboard:', value);
        })
        .catch((error) => {
            console.error('Copy to clipboard failed:', error);
        });
}

export const ConnectionsForm = () => {
    const [categories, setCategories] = useState<ConnectionCategories>(defaultCategories);
    const navigate = useNavigate();

    const validateCategories = () => {
        for (const category of categories) {
            if (!category.description) {
                return false;
            }

            for (const word of category.words) {
                if (!word) {
                    return false;
                }
            }
        }

        return true;
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const text = await file.text();
            const result = Papa.parse(text, {
                skipEmptyLines: true,
                header: false, // No header row
            });

            const rows = result.data as string[][];
            const categoriesList: ConnectionCategories = rows.map((row, index) => {
                return { id: index + 1, description: row[0], words: row.slice(1) };
            });
            setCategories(categoriesList);
        }
    };


    return (
        <Form style={{ color: "white", padding: "24px 48px" }} {...formItemLayout}>
            <h1>ConnectionsForm</h1>

            {
                categories.map((category, index) => (
                    <div key={index} >
                        <h2>Category {index + 1}</h2>

                        <Form.Item label="Description">
                            <Input
                                type="text"
                                value={category.description}
                                onChange={(event) => {
                                    const newCategories = [...categories];
                                    newCategories[index].description = event.target.value;
                                    setCategories(newCategories);
                                }}
                            />
                        </Form.Item>

                        <Form.Item label="Word 1">
                            <Input
                                type="text"
                                value={category.words[0]}
                                onChange={(event) => {
                                    const newCategories = [...categories];
                                    newCategories[index].words[0] = event.target.value;
                                    setCategories(newCategories);
                                }}
                            />
                        </Form.Item>

                        <Form.Item label="Word 2">
                            <Input
                                type="text"
                                value={category.words[1]}
                                onChange={(event) => {
                                    const newCategories = [...categories];
                                    newCategories[index].words[1] = event.target.value;
                                    setCategories(newCategories);
                                }}
                            />
                        </Form.Item>

                        <Form.Item label="Word 3">
                            <Input
                                type="text"
                                value={category.words[2]}
                                onChange={(event) => {
                                    const newCategories = [...categories];
                                    newCategories[index].words[2] = event.target.value;
                                    setCategories(newCategories);
                                }}
                            />
                        </Form.Item>

                        <Form.Item label="Word 4">
                            <Input
                                type="text"
                                value={category.words[3]}
                                onChange={(event) => {
                                    const newCategories = [...categories];
                                    newCategories[index].words[3] = event.target.value;
                                    setCategories(newCategories);
                                }}
                            />
                        </Form.Item>
                    </div>
                ))
            }

            <Form.Item>
                <Button
                    onClick={() => {
                        const valid = validateCategories();
                        if (valid) {
                            navigate("/connections", { state: { categories } });
                        }
                    }}
                >
                    Submit
                </Button>
            </Form.Item>

            <Form.Item>
                <Button
                    onClick={() => {
                        const jsonString = JSON.stringify(categories);
                        const encodedBase64String = encodeURIComponent(btoa(jsonString));
                        const link = `${window.location.origin}/connections?categories=${encodedBase64String}`;
                        copyToClipboard(link);
                    }}
                >
                    Generate link
                </Button>
            </Form.Item>

            <Form.Item>
                <Input type="file" accept=".csv" onChange={handleFileChange} />
            </Form.Item>
        </Form>
    );
}
