/**
 * 导航栏配置文件
 * 统一管理导航菜单、Logo、动画等设置
 */

// Logo 配置
export const logo = {
  icon: '🚀',
  text: 'AptS-1547',
  homeLink: '/',
  hoverColor: '#ed9a28',
}

// 导航菜单配置
export const navigationMenu = [
  {
    name: 'Home',
    path: '/',
    type: 'internal' as const,
  },
  {
    name: 'Projects',
    path: '/projects',
    type: 'internal' as const,
  },
  {
    name: 'Blog',
    path: 'https://www.esaps.net/',
    type: 'external' as const,
    target: '_blank',
  },
]

// 导航栏样式配置
export const navigationStyles = {
  // 导航栏背景
  background: 'bg-white/95',
  backdropBlur: 'backdrop-blur-md',
  border: 'border-b border-gray-200',
  shadow: 'shadow-sm',

  // 固定位置
  position: 'fixed top-0 left-0 right-0',
  zIndex: 'z-50',

  // 容器配置
  container: {
    maxWidth: 'max-w-6xl',
    padding: 'px-4 xl:px-8 2xl:px-16',
    innerPadding: 'py-3',
  },

  // Logo 样式
  logo: {
    base: 'flex items-center space-x-2 text-xl font-bold text-gray-800 transition-all duration-200',
    hover: 'hover:scale-105 touch:hover:scale-100',
    hoverColor: 'hover:text-[#ed9a28]',
  },

  // 桌面端菜单样式
  desktopMenu: {
    container: 'hidden md:flex items-center space-x-6',
    item: {
      base: 'px-3 py-2 text-sm font-medium transition-all duration-200 relative group',
      hover:
        'hover:scale-105 hover:-translate-y-0.5 touch:hover:scale-100 touch:hover:translate-y-0',
      active: 'text-[#ed9a28]',
      inactive: 'text-gray-600 hover:text-[#ed9a28]',
    },
    underline: {
      base: 'absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#ed9a28] to-[#6dd0e0] transition-all duration-200 transform origin-center',
      active: 'scale-x-100',
      inactive: 'scale-x-0 group-hover:scale-x-100',
    },
  },

  // 移动端菜单样式
  mobileMenu: {
    button: {
      base: 'md:hidden p-2 rounded-md text-gray-600 transition-all duration-200',
      hover: 'hover:text-[#ed9a28] hover:bg-gray-50 hover:scale-110 touch:hover:scale-100',
    },
    container: 'md:hidden border-t border-gray-200 py-3 space-y-2 w-full overflow-x-hidden',
    item: {
      base: 'block px-3 py-2 text-sm font-medium transition-all duration-200',
      hover: 'hover:scale-105 hover:translate-x-2 touch:hover:scale-100 touch:hover:translate-x-0',
      active: 'text-[#ed9a28] bg-gradient-to-r from-orange-50 to-cyan-50',
      inactive:
        'text-gray-600 hover:text-[#ed9a28] hover:bg-gradient-to-r hover:from-orange-50 hover:to-cyan-50',
    },
  },
}

// 动画配置
export const navigationAnimations = {
  // 导航栏入场动画
  navbar: {
    name: 'animate-slide-down',
    duration: '0.4s',
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },

  // Logo 动画
  logo: {
    container: 'animate-bounce-in',
    icon: 'animate-rotate-in',
    text: 'animate-slide-in-left',
  },

  // 桌面菜单动画
  desktopMenu: 'animate-stagger-in',

  // 移动菜单动画
  mobileMenu: {
    transition: {
      enterActive: 'transition duration-200 ease-out',
      enterFrom: 'opacity-0 scale-95',
      enterTo: 'opacity-100 scale-100',
      leaveActive: 'transition duration-100 ease-in',
      leaveFrom: 'opacity-100 scale-100',
      leaveTo: 'opacity-0 scale-95',
    },
  },
}

// 响应式配置
export const navigationResponsive = {
  // 断点
  breakpoints: {
    mobile: 768, // md 断点
  },

  // 移动端行为
  mobile: {
    autoClose: true, // 路由切换时自动关闭
    closeOnOutsideClick: true, // 点击外部关闭
    closeOnEscape: true, // ESC 键关闭
    closeOnResize: true, // 窗口大小变化时关闭
  },
}

// 导出完整配置
export const navigationConfig = {
  logo,
  menu: navigationMenu,
  styles: navigationStyles,
  animations: navigationAnimations,
  responsive: navigationResponsive,
}
