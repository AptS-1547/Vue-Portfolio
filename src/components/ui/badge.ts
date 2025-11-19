import { cva, type VariantProps } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary dark:text-secondary border border-primary/20',
        secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100',
        success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
        warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
        error: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
        outline: 'text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
