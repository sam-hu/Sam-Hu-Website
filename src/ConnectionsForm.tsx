import { Button, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { ConnectionCategories, validateCategories } from "./ConnectionsPlay";
import { useLocation, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import './connections.scss';
import Title from "antd/es/typography/Title";
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from "antd/es/upload";

const defaultCategories: ConnectionCategories = [
    {
        id: 0,
        description: "",
        words: ["", "", "", ""]
    },
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

    const handleUpload = (file: RcFile) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = Papa.parse(event.target?.result as string, {
                skipEmptyLines: true,
                header: false, // No header row
            });

            const rows = result.data as string[][];
            const categoriesList: ConnectionCategories = rows.map((row, index) => {
                return { id: index + 1, description: row[0], words: row.slice(1) };
            });
            setCategories(categoriesList);
        }
        reader.readAsText(file);
        return false;
    }

    const generateLink = (): string => {
        const jsonString = JSON.stringify(categories);
        const encodedBase64String = encodeURIComponent(btoa(jsonString));
        return `/connections-play?categories=${encodedBase64String}`;
    }

    return (
        <Form
            style={{ color: "black", padding: "48px calc(48px + (100vw - 400px) * 0.4)" }}
            {...formItemLayout}
            labelCol={{ flex: '100px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}>
            <Form.Item >
                <Title level={1} style={{ marginTop: 0, marginBottom: 0 }}>Connections</Title>
            </Form.Item>

            {
                categories.map((category, index) => (
                    <div key={index} >
                        <Title level={4}>{difficulties[index]}</Title>

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

                        <WordsInput
                            label="Words"
                            initialValues={category.words}
                            onSuccess={(value) => {
                                const newCategories = [...categories];
                                newCategories[index].words = value;
                                setCategories(newCategories);
                            }}
                        />
                    </div>
                ))
            }

            <Form.Item>
                <Button
                    style={{ marginTop: "24px" }}
                    className="button"
                    disabled={!validateCategories(categories)}
                    onClick={() => {
                        const valid = validateCategories(categories);
                        if (valid) {
                            const link = generateLink();
                            navigate(link);
                        }
                    }}
                    type="primary"
                >
                    Play!
                </Button>
            </Form.Item>

            <Form.Item>
                <Upload
                    accept=".csv"
                    maxCount={1}
                    beforeUpload={handleUpload}
                    showUploadList={false}
                >
                    <Button
                        className="button"
                        icon={<UploadOutlined />}
                    >
                        Upload CSV
                    </Button>
                </Upload>
            </Form.Item>
        </Form>
    );
}

const WordsInput = ({ label, initialValues, onSuccess }: { label: string, initialValues: string[], onSuccess: (value: string[]) => void }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialValues.some(v => v.length > 0)) {
            setValue(initialValues.join(", "));
        }
    }, [initialValues])

    const validateAndSet = () => {
        const list = value.split(",").map((word) => word.trim());
        if (list.length !== 4 || list.some((word) => word.length === 0)) {
            setError("Input not valid");
        } else {
            setError(null);
            onSuccess(list);
        }
    }

    return <Form.Item label={label} validateStatus={error ? "error" : ""} help={error}>
        <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={validateAndSet}
        />
    </Form.Item>
}
