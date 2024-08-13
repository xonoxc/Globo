import purify from "dompurify"

interface HTMLComponentProps {
     html: string
}

const HTMLComponent = ({ html }: HTMLComponentProps) => {
     const cleanHtml = purify.sanitize(html)

     return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
}

export default HTMLComponent
