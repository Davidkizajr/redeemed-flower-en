import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: (string | JSX.Element)[] = []

      if (fileData.dates) {
        segments.push(formatDate(fileData.dates.created))
		segments.push(formatDate(fileData.dates.modified))
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(displayedTime)
      }

      const segmentsElements = segments.map((segment) => <span>{segment}</span>)

      if (formatDate(fileData.dates.modified) != formatDate(getDate(cfg, fileData)!)) {

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "0.25rem",
          }}
        >
          <span className="content-meta">Published : {segments[0]}</span>
          <span className="content-meta" style={{ margin: "0 10px" }}>
            |
          </span>{" "}
          {/* Adjust margin as needed */}
          <span className="content-meta">Last edited : {segments[1]}</span>
          <span className="content-meta" style={{ margin: "0 10px" }}>
            |
          </span>{" "}
          {/* Adjust margin as needed */}
          <span className="content-meta">{segments[2]}</span>
        </div>
      )
      }

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "0.25rem",
          }}
        >
          <span className="content-meta">Published : {segments[0]}</span>
          <span className="content-meta" style={{ margin: "0 10px" }}>
            |
          </span>{" "}
          {/* Adjust margin as needed */}
          <span className="content-meta">{segments[2]}</span>
        </div>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor