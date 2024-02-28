import { ActionType, BlockType, PresentationStyleSettings } from '@/types'

const BANNER: Banner = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.Banner,
  backgroundColor: '#FFFFFF',
  images: [],
}

const CUSTOM_BANNER: CustomBanner = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.CustomBanner,
  backgroundColor: '#FFFFFF',
  images: [],
  title: {
    text: 'Custom banner',
    visible: true,
  },
}

const SLIDER: Slider = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.Slider,
  backgroundColor: '#FFFFFF',
  images: [],
  pagination: {
    visible: true,
  },
}

const GRID: Grid = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.Grid,
  backgroundColor: '#FFFFFF',
  columns: 4,
  images: [],
  spacing: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    inner: 0,
  },
}

const CONTENT_HTML: InlineHtmlContent = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.InlineHtmlContent,
  backgroundColor: '#FFFFFF',
  content: '',
}

const WEB_PAGE: Webpage = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.Webpage,
  backgroundColor: '#FFFFFF',
  source: {
    url: '',
  },
}

const ACTION_BUTTON: ActionButton = {
  id: '',
  action: {
    type: ActionType.OpenInAppScreen,
  },
  type: BlockType.ActionButton,
  backgroundColor: '#FFFFFF',
  title: {
    text: 'Enter new title',
  },
}

const ACTION_LINK: ActionLink = {
  id: '',
  type: BlockType.Url,
  backgroundColor: '#FFFFFF',
  title: {
    text: 'View detail',
  },
  source: {
    url: '',
    openExternal: false,
  },
  options: {
    presentationStyle: PresentationStyleSettings.Modal,
    collapsed: false,
  },
  conditions: [],
}

const HTML: Html = {
  id: '',
  type: BlockType.Html,
  backgroundColor: '#FFFFFF',
  title: {
    text: 'View detail',
  },
  source: {
    html: '',
  },
  options: {
    presentationStyle: PresentationStyleSettings.Modal,
    collapsed: false,
  },
  conditions: [],
}

const PRODUCT_DETAIL_IMAGE: ProductDetailImage = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.ProductDetailImage,
  backgroundColor: '#FFFFFF',
  images: [],
  title: {
    text: 'View detail',
  },
  options: {
    presentationStyle: PresentationStyleSettings.Modal,
    collapsed: false,
  },
  conditions: [],
}

const PRODUCT_DETAIL_VIDEO: ProductDetailVideo = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.ProductDetailVideo,
  backgroundColor: '#FFFFFF',
  videos: [],
  title: {
    text: 'View detail',
  },
  options: {
    presentationStyle: PresentationStyleSettings.Modal,
    collapsed: false,
  },
  conditions: [],
}
const VARIANTS: Variants = {
  id: '',
  type: BlockType.Variants,
  backgroundColor: '#FFFFFF',
  title: {
    text: 'Select variant',
  },
  options: {
    presentationStyle: PresentationStyleSettings.Accordion,
    collapsed: false,
  },
}
const DESCRIPTION: Description = {
  id: '',
  type: BlockType.Description,
  backgroundColor: '#FFFFFF',
  title: {
    text: 'Description',
  },
  options: {
    presentationStyle: PresentationStyleSettings.Modal,
    collapsed: false,
  },
}

const RELATED_PRODUCTS: RelatedProducts = {
  id: '',
  type: BlockType.RelatedProducts,
  backgroundColor: '#FFFFFF',
  title: {
    text: 'Related products',
  },
}
const REVIEWS: Reviews = {
  id: '',
  type: BlockType.Reviews,
  backgroundColor: '#FFFFFF',
  title: {
    text: 'Top review',
  },
}

const CUSTOM_FIELDS: CustomFields = {
  id: '',
  type: BlockType.CustomFields,
  backgroundColor: '#FFFFFF',
  title: {
    text: 'Product attributes',
  },
  options: {
    presentationStyle: PresentationStyleSettings.Accordion,
    collapsed: false,
  },
}

const SPACE: Spacer = {
  id: '',
  height: 4,
  type: BlockType.Spacer,
  backgroundColor: '#F5F5F5',
}

const VIDEO: Video = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.Video,
  backgroundColor: '#FFFFFF',
  videos: [],
}

const COUNTDOWN: Countdown = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.Countdown,
  backgroundColor: '#FFFFFF',
  startAt: new Date(),
  endAt: new Date(),
  title: {
    text: '',
    textColor: '#000000',
  },
  startTitle: {
    text: '',
    textColor: '#000000',
  },
  endTitle: {
    text: '',
    textColor: '#000000',
  },
  hideWhenFinished: true,
  images: [],
}

const SEARCH_BAR: SearchBar = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.SearchBar,
  backgroundColor: '#FFFFFF',
  placeholder: 'Search Product',
}

const CATALOG_GRID: CatalogGrid = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.CatalogGrid,
  columns: 4,
  backgroundColor: '#FFFFFF',
}

const RECENTLY_VIEWED: RecentlyViewed = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  type: BlockType.RecentlyViewed,
  backgroundColor: '#FFFFFF',
}

const STORE: Store = {
  id: '',
  type: BlockType.Store,
  images: [
    {
      visible: true,
    },
  ],
}

const PRODUCT: ProductGrid | ProductCarousel | ProductParallax = {
  id: '',
  action: {
    type: ActionType.OpenCategory,
    url: {
      url: '',
      openExternal: false,
    },
  },
  columns: 2,
  backgroundColor: '#FFFFFF',
  viewMore: {
    text: 'View all',
  },
}

export const DEFAULT_NEW_BLOCK = {
  BANNER,
  CUSTOM_BANNER,
  SLIDER,
  VIDEO,
  COUNTDOWN,
  SEARCH_BAR,
  SPACE,

  CATALOG_GRID,
  PRODUCT,
  RECENTLY_VIEWED,
  STORE,

  GRID,
  CONTENT_HTML,
  WEB_PAGE,
  ACTION_BUTTON,

  ACTION_LINK,
  HTML,
  PRODUCT_DETAIL_IMAGE,
  PRODUCT_DETAIL_VIDEO,
  VARIANTS,
  DESCRIPTION,
  RELATED_PRODUCTS,
  REVIEWS,
  CUSTOM_FIELDS,
}
