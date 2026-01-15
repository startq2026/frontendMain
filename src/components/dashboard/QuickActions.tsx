import Link from 'next/link'
import { Upload, BarChart3, FileSpreadsheet } from 'lucide-react'

export default function QuickActions() {
  const actions = [
    {
      title: 'Upload Excel',
      description: 'Import new sales data',
      href: '/upload',
      icon: Upload,
      color: 'bg-primary-500',
    },
    {
      title: 'View Analytics',
      description: 'Detailed reports',
      href: '/analytics',
      icon: BarChart3,
      color: 'bg-accent-500',
    },
    {
      title: 'Browse Data',
      description: 'View all records',
      href: '/data',
      icon: FileSpreadsheet,
      color: 'bg-brown-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action) => (
        <Link
          key={action.title}
          href={action.href}
          className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
                   hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-200 group"
        >
          <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center
                        group-hover:scale-110 transition-transform duration-200`}>
            <action.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{action.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
