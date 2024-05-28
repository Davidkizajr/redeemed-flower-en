import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.PageTitle(),Component.Search(),Component.Darkmode(),],
  footer: Component.Footer({
    links: {
	YouTube: "https://www.youtube.com/channel/UCJFRIBXYPoMnVAuVY-qohAA",
	Instagram: "https://www.instagram.com/redeemedflower_/"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList()
  ],
  afterBody: [
    Component.Backlinks(),
  ],
  left: [
    Component.Explorer(),
  ],
  right: [
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  afterBody: [
    Component.Backlinks(),
  ],
  left: [
  ],
  right: [],
}
