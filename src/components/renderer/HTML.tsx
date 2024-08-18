import purify from "dompurify"
import "../../styles/post.css"

interface HTMLComponentProps {
     html: string
}

const HTMLComponent = ({ html }: HTMLComponentProps) => {
     const cleanHtml = purify.sanitize(html, {
          USE_PROFILES: { html: true },
     })

     const removeUnwantedSpaces = (html: string) => {
          return html.replace(/&nbsp;/g, " ").replace(/<p>\s*<\/p>/g, "")
     }

     const cleanedConent = removeUnwantedSpaces(cleanHtml)

     return (
          <div
               className="post-content"
               dangerouslySetInnerHTML={{ __html: cleanedConent }}
          />
     )
}
export default HTMLComponent
