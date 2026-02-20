
export const EditorFooter = () => {
    return (
        <div className="relative border-t border-zinc-200/50 dark:border-zinc-800/50 bg-gray-50/50 dark:bg-zinc-900/50 px-6 py-3 flex items-center justify-between text-xs text-zinc-500">
            <div className="flex items-center gap-4">
                <span>Select text to add comments</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400">Ctrl</kbd>
                    <span>+</span>
                    <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400">B</kbd>
                    <span>Bold</span>
                </span>
                <span className="hidden sm:flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400">Ctrl</kbd>
                    <span>+</span>
                    <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400">I</kbd>
                    <span>Italic</span>
                </span>
            </div>
            <div className="text-zinc-400 dark:text-zinc-600">
                Powered by Tiptap.js + Velt
            </div>
        </div>
    );
};
