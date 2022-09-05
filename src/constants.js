/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { AccountProfile } from './components/AccountProfile'
import { ProjectsList } from './components/ProjectsList'
import { ActivityFeed } from './components/ActivityFeed'
import { Navbar } from './components/Navbar'

export const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Domains', href: '#', current: false },
]
export const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]
export const projects = [
    {
        name: 'Workcation',
        href: '#',
        siteHref: '#',
        repoHref: '#',
        repo: 'debbielewis/workcation',
        tech: 'Laravel',
        lastDeploy: '3h ago',
        location: 'United states',
        starred: true,
        active: true,
    },
    // More projects...
]
export const activityItems = [
    { project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
    // More items...
]

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}





export default function Example() {
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
            {/* Background color split screen for large screens */}
            <div className="fixed top-0 left-0 h-full w-1/2 bg-white" aria-hidden="true" />
            <div className="fixed top-0 right-0 h-full w-1/2 bg-gray-50" aria-hidden="true" />
            <div className="relative flex min-h-full flex-col">
                {/* Navbar */}
                <Navbar/>

                {/* 3 column wrapper */}
                <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
                    {/* Left sidebar & main wrapper */}
                    <div className="min-w-0 flex-1 bg-white xl:flex">
                        {/* Account profile */}
                        <AccountProfile />

                        {/* Projects List */}
                        <ProjectsList />
                    </div>
                    {/* Activity feed */}
                    <ActivityFeed />
                </div>
            </div>
        </>
    )
}
