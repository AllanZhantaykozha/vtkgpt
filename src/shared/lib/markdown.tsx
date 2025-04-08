import ReactMarkdown from 'react-markdown'

type Props = {
    content: string
}

export const MarkdownViewer = ({ content }: Props) => {
    return (
        <div className="prose max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    )
}
