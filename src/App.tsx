import { createSignal } from 'solid-js'
import type { Component } from 'solid-js'
import { open } from '@tauri-apps/api/dialog'

const App: Component = () => {
    const [darkMode, setDarkMode] = createSignal(false)
    const [selectedDir, setSelectedDir] = createSignal<string | null>(null)

    const selectDirectory = async () => {
        try {
            const dir = await open({
                directory: true,
                multiple: false,
                title: 'Select a Directory',
                filters: []
            })

            if (dir) {
                setSelectedDir(dir as string)
                console.log('Selected directory:', dir)
            }
        } catch (error) {
            console.error('Error selecting directory:', error)
        }
    }

    const toggleDarkMode = () => {
        setDarkMode(!darkMode())
        if (!darkMode()) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    return (
        <div class="min-h-screen bg-white dark:bg-gray-800">
            <div class="py-20 text-center text-4xl text-green-700 dark:text-green-300">
                This is a{' '}
                <a href="https://www.tauri.studio/" target="_blank" class="underline">
                    Tauri
                </a>{' '}
                +{' '}
                <a href="https://www.solidjs.com/" target="_blank" class="underline">
                    Solid
                </a>{' '}
                +{' '}
                <a href="https://tailwindcss.com/" target="_blank" class="underline">
                    Tailwind
                </a>{' '}
                +{' '}
                <a href="https://www.typescriptlang.org/" target="_blank" class="underline">
                    Typescript
                </a>{' '}
                App!
            </div>
            <div class="text-center">
                <button
                    onClick={() => {
                        selectDirectory().catch(error => console.error(error))
                    }}
                    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded dark:bg-blue-700"
                >
                    Select Directory
                </button>
                <button
                    onClick={toggleDarkMode}
                    class="ml-4 mt-4 px-4 py-2 bg-gray-500 text-white rounded dark:bg-gray-700"
                >
                    Toggle Dark Mode
                </button>
                {selectedDir() && (
                    <div class="mt-4 text-xl text-gray-700 dark:text-gray-300">
                        Selected Directory: {selectedDir()}
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
