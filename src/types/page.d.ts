import { PageTypes, PresentationStyleSettings } from '@/types/enum'

declare global {
  interface BottomTab {
    id?: string
    title?: BottomTabTitle
    iconset?: Iconset
    page?: {
      id?: string
      title?: Title
    }
    sidebar?: Sidebar
  }

  type SinglePage = Omit<BottomTab, 'iconset'>

  interface Iconset {
    name?: PageTypes
    color?: string
    selectedColor?: string
    source?: {
      uri?: string
    }
  }

  interface Sidebar {
    id?: string
    title?: Title
    layout?: string
    gestureEnabled?: boolean
    backgroundColor?: string
    items?: SidebarItem[]
  }
  interface SidebarItem {
    id?: string
    action?: Action
    title?: Title
    icon?: Asset
    bagde?: Bagde
  }
  interface Bagde {
    text?: string
    textColor?: string
    backgroundColor?: string
  }

  interface BottomTabTitle extends Title {
    text?: string
    textColor?: string
    visible?: boolean
    selectedTextColor?: string
  }

  interface Block {
    id?: string
    type?: BlockType
    backgroundColor?: string
    title?: Title
    action?: Action
    editable?: boolean
    deleteable?: boolean
    spacing?: {
      top: number
      bottom: number
      left: number
      right: number
      inner: number
    }
  }

  interface Banner extends Block {
    images?: Asset[]
  }

  interface CustomBanner extends Block {
    images?: Asset[]
  }

  interface Slider extends Block {
    images?: Asset[]
    pagination?: {
      visible?: boolean
    }
  }

  interface Video extends Block {
    videos?: Asset[]
  }

  interface Grid extends Block {
    images?: Asset[]
    columns?: number
    viewMore?: Title
  }

  interface Slider extends Block {
    images?: Asset[]
    pagination?: {
      visible?: boolean
    }
  }

  interface Carousel extends Block {
    viewMore?: Title
    images?: Asset[]
  }

  interface Parallax extends Block {
    images?: Asset[]
    viewMore?: Title
  }

  interface Countdown extends Block {
    startAt?: Date
    endAt?: Date
    title?: Title
    startTitle?: Title
    endTitle?: Title
    hideWhenFinished?: boolean
    images?: Asset[]
  }

  interface SearchBar extends Block {
    placeholder?: string
  }

  type RecentlyViewed = Block

  interface Spacer extends Block {
    height?: number
  }

  interface Store extends Block {
    images?: Asset[]
    store?: {
      name?: string
      address?: string
      phone?: string
      mail?: string
      website?: string
    }
    openDays?: {
      id?: string
      label?: string
      type?: string
      time?: string
    }[]
    descriptions?: string
    coordinates?: {
      lat?: number
      lng?: number
    }
  }

  interface InlineHtmlContent extends Block {
    content?: string
  }

  interface Webpage extends Block {
    source?: {
      url?: string
    }
  }

  interface ActionButton extends Block {
    iconset?: Iconset
  }

  interface ActionLink extends Block {
    source?: {
      url?: string
      openExternal?: boolean
    }
    options?: {
      presentationStyle?: PresentationStyleSettings
      collapsed?: boolean
    }
    conditions?: {
      key?: string
      values?: string[]
    }[]
  }

  interface Html extends Block {
    source?: {
      html?: string
    }
    options?: {
      presentationStyle?: PresentationStyleSettings
      collapsed?: boolean
    }
    conditions?: {
      key?: string
      values?: string[]
    }[]
  }

  interface ProductDetailImage extends Block {
    images?: Asset[]
    options?: {
      presentationStyle?: PresentationStyleSettings
      collapsed?: boolean
    }
    conditions?: {
      key?: string
      values?: string[]
    }[]
  }

  interface ProductDetailVideo extends Block {
    videos?: Asset[]
    options?: {
      presentationStyle?: PresentationStyleSettings
      collapsed?: boolean
    }
    conditions?: {
      key?: string
      values?: string[]
    }[]
  }

  interface Variants extends Block {
    options?: {
      presentationStyle?: PresentationStyleSettings
      collapsed?: boolean
    }
    title?: Title
  }

  interface Description extends Block {
    options?: {
      presentationStyle?: PresentationStyleSettings
      collapsed?: boolean
    }
    title?: Title
  }

  interface Reviews extends Block {
    options?: {
      presentationStyle?: PresentationStyleSettings
      collapsed?: boolean
    }
    title?: Title
  }

  interface RelatedProducts extends Block {
    options?: {
      presentationStyle?: PresentationStyleSettings
      collapsed?: boolean
    }
    title?: Title
  }

  interface CustomFields extends Block {
    options?: {
      presentationStyle?: PresentationStyleSettings
      collapsed?: boolean
    }
    title?: Title
    conditions?: {
      key?: string
      values?: string[]
    }[]
    fields?: {
      name?: string
      id?: string
    }[]
  }

  interface Action {
    type?: ActionType
    url?: {
      url?: string
      openExternal?: boolean
    }
    product?: {
      id?: number
      name?: string
      image?: string
      sku?: string
    }
    category?: {
      id?: number
      name?: string
      image?: string
      manufactureCategory?: boolean
      children?: Category[]
    }
    brand?: {
      id?: number
      name?: string
      image?: string
    }
    page?: Omit<AppPageLayout, 'blocks'>
    socialMedia?: {
      url?: string
      packageName?: string
      urlScheme?: string
    }
    phone?: {
      number?: string
    }
    sms?: {
      text?: string
    }
    email?: {
      address?: string
      subject?: string
      content?: string
    }
  }

  interface Asset {
    action?: Action
    ratio?: number
    width?: number
    height?: number
    resizeMode?: ResizeMode
    src?: string
    thumbnail?: string
    visible?: boolean
    type?: 'image' | 'video'
  }

  declare enum ResizeMode {
    Cover = 'cover',
    Stretch = 'stretch',
    Contain = 'contain',
    Center = 'center',
  }

  interface Title {
    text?: string
    textColor?: string
    visible?: boolean
  }

  interface Category {
    id?: string | number
    name?: string
    visibleName?: boolean
    image?: Asset
    manufactureCategory?: boolean
    selected?: boolean
    visible?: boolean
  }

  interface Brand {
    id?: string | number
    name?: string
    visibleName?: boolean
    image?: Asset
    manufactureCategory?: boolean
    selected?: boolean
    visible?: boolean
  }

  interface CatalogCollapse extends Block {
    category?: Category & {
      children?: Category[]
    }
  }

  interface BannerCategories extends Block {
    category?: Category & {
      children?: Category[]
    }
  }

  interface Brand extends Block {
    brand?: Brand
  }

  interface CatalogCarousel extends Block {
    categories?: Category[]
    rows?: number
    viewMore?: Title
  }

  interface CatalogGrid extends Block {
    categories?: Category[]
    columns?: number
    viewMore?: Title
  }

  interface ProductCarousel extends Block {
    products?: {
      id?: number
      name?: string
      image?: string
      price?: number
    }[]
    category?: Category
    viewMore?: Title
  }

  interface ProductGrid extends Block {
    products?: {
      id?: number
      name?: string
      image?: string
      price?: number
    }[]
    category?: Category
    columns?: number
    viewMore?: Title
  }

  interface ProductParallax extends Block {
    products?: {
      id?: number
      name?: string
      image?: string
      price?: number
    }[]
    category?: Category
    viewMore?: Title
  }

  type PageBlock = Banner &
    Video &
    Grid &
    Slider &
    Carousel &
    Parallax &
    Countdown &
    Spacer &
    Content &
    SearchBar &
    InlineHtmlContent &
    CatalogCollapse &
    CatalogCarousel &
    CatalogGrid &
    ProductCarousel &
    ProductGrid &
    ProductParallax &
    RecentlyViewed

  export interface AppPageOptions {
    imageEnabled?: boolean
    miniMapEnabled?: boolean
    itemSeparator?: ItemSeparator
    layout?: {
      searchBar?: {
        visible?: boolean
        backgroundColor?: string
        placeholder?: string
      }
    }
  }

  export interface ItemSeparator {
    height?: number | null
    visible?: boolean
    backgroundColor?: string
  }

  interface AppPage {
    id?: string
    type?: PageTypes
    multiplePage?: boolean
    title?: Title
    pages?: AppPageLayout[]
    options?: AppPageOptions
  }

  interface AppPageLayout {
    id?: string
    title?: Title
    backgroundColor?: string
    blocks?: PageBlock[]
    spacerHeight?: number
    spacerBackgroundColor?: string
    options?: {
      scrollBehavior?: OptionScrollBehavior
    }
  }
}
