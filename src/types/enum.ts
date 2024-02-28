export enum DroppableType {
  Block = 'block',
  Catalog = 'catalog',
  CatalogChildren = 'catalogChildren',
  BottomBar = 'bottomBar',
  MultiplePage = 'multiplePage',
  CustomFields = 'customFields',
}

export enum DroppableId {
  BlockHandle = 'blockHandle',
  BlockPreview = 'blockPreview',
  BottomBarHandle = 'bottomBarHandle',
  BottomBarPreview = 'bottomBarPreview',
  CatalogHandle = 'catalogHandle',
  CatalogPreview = 'catalogPreview',
  MultiplePage = 'multiplePage',
  CustomFields = 'customFields',
}

export enum NotificationEndPoints {
  Product = 'product',
  Category = 'category',
  Page = 'page',
  None = 'none',
}

export enum RecipientType {
  Segments = 'SEGMENTS',
  Devices = 'DEVICES',
}

export enum BlockType {
  Banner = 'banner',
  CustomBanner = 'custombanner',
  Video = 'video',
  Grid = 'grid',
  Slider = 'slider',
  Carousel = 'carousel',
  Parallax = 'parallax',
  Countdown = 'countdown',
  RecentlyViewed = 'recentlyViewed',
  Spacer = 'spacer',
  SearchBar = 'searchBar',
  InlineHtmlContent = 'inlineHtmlContent',
  Webpage = 'webpage',
  ActionButton = 'actionButton',
  Brand = 'brand',
  Store = 'store',

  CatalogCarousel = 'catalogCarousel',
  CatalogGrid = 'catalogGrid',

  ProductGrid = 'productGrid',
  ProductCarousel = 'productCarousel',
  ProductParallax = 'productParallax',

  CatalogCollapse = 'catalogCollapse',
  BannerCategories = 'bannerCategories',

  Gallery = 'gallery',
  Information = 'information',

  Variants = 'variants',
  Description = 'description',
  Reviews = 'reviews',
  RelatedProducts = 'relatedProducts',

  ProductDetailImage = 'productDetailImage',
  ProductDetailVideo = 'productDetailVideo',
  Url = 'url',
  Html = 'html',
  CustomFields = 'customFields',
}

export enum ActionType {
  NoAction = 'noAction',
  OpenCategory = 'openCategory',
  OpenProduct = 'openProduct',
  OpenInAppScreen = 'openInAppScreen',
  OpenSocialMedia = 'openSocialMedia',
  OpenUrl = 'openUrl',
  MakePhoneCall = 'makePhoneCall',
  SendSMS = 'sendSMS',
  SendEmail = 'sendEmail',
  OpenBrand = 'openBrand',
}

export enum MenuItemType {
  MenuItem = 'menuItem',
  Title = 'title',
}

export enum ResizeMode {
  Cover = 'cover',
  Stretch = 'stretch',
  Contain = 'contain',
  Center = 'center',
}

export enum MediaLibraryMode {
  Single = 'single',
  Multi = 'multi',
}

export enum UploadMediaMode {
  Image = 'image',
  Video = 'video',
  Icon = 'icon',
}

export const enum PageTypes {
  Custom = 'custom',
  Home = 'home',
  Product = 'product',
  ProductList = 'productList',
  Catalogs = 'catalogs',
  CategoryTree = 'categoryTree',
  Brands = 'brands',
  Cart = 'cart',
  Notifications = 'notifications',
  Orders = 'orders',
  Search = 'search',
  SignIn = 'signIn',
  SignUp = 'signUp',
  Wishlist = 'wishlist',
  Address = 'address',
  MyAccount = 'myAccount',
  LookBook = 'lookBook',
  Scanner = 'scanner',
  StoreLocator = 'storeLocator',
}

export const enum ProductBlockPresentationTypes {
  Accordion = 'accordion',
  Modal = 'modal',
}

export const enum ImageStyle {
  '1:1' = '1:1',
  '2:3' = '2:3',
  '3:4' = '3:4',
}

export const enum CornerStyle {
  Sharp = 'sharp',
  Round = 'round',
  Circle = 'circle',
}

export const enum IconStyle {
  Solid = 'solid',
  Outline = 'outline',
}

export const enum PresentationStyleSettings {
  Accordion = 'accordion',
  Modal = 'modal',
}

export const enum OptionScrollBehavior {
  Paging = 'paging',
  Smooth = 'smooth',
}
