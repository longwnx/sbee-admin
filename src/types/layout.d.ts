interface BottomTab {
  id?: string
  title?: BottomTabTitle
  iconset?: Iconset
  page?: AppPage
  notDelete?: boolean
}

interface Iconset {
  name?: string
  color?: string
  selectedColor?: string
}

interface BottomTabTitle extends Title {
  text?: string
  visible?: boolean
  textColor?: string
  selectedTextColor?: string
}

interface UiLayout {
  id?: string
  appKey?: string
  bottomTabs?: BottomTab[]
  theme?: UiLayoutTheme
  options?: UiLayoutOptions
  defaultActive?: boolean
}

interface UiLayoutOptions {
  topBar?: {
    backgroundColor?: string
  }
  bottomTabs?: {
    backgroundColor?: string
  } & BottomTab
}

interface UiLayoutTheme {
  layout?: {
    backgroundColor?: string
  }
  colour?: Colour
  font?: Font
  icon?: Icon
  corner?: Corner
  image?: ImageLayout
  logo?: Asset
}

interface Corner {
  style?: CornerStyle
}

interface Colour {
  primary?: string
  secondary?: string
}

interface Font {
  family?: string
}

interface Icon {
  style?: IconStyle
  size?: number
}

interface ImageLayout {
  style?: ImageStyle
}
