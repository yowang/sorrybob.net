export default function Controls() {
  const controls = [
    { key: 'A', action: 'Left finger grip', description: 'Control the left hand finger' },
    { key: 'W', action: 'Right finger grip', description: 'Control the right hand finger' },
    { key: 'E', action: 'Rotate hand', description: 'Rotate the surgeon hand' },
    { key: 'R', action: 'Toggle hand', description: 'Switch between left and right hand' },
    { key: 'Mouse', action: 'Move hand', description: 'Control the hand movement' },
  ]

  return (
    <section className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-game-dark mb-6 flex items-center gap-3">
        <span className="text-4xl">🎮</span>
        Game Controls
      </h2>
      <div className="grid gap-4">
        {controls.map((control, index) => (
          <div
            key={index}
            className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <kbd className="min-w-[80px] px-4 py-2 bg-game-primary text-white rounded-lg font-mono text-lg font-bold shadow-md">
              {control.key}
            </kbd>
            <div className="flex-1">
              <div className="font-semibold text-game-dark text-lg">
                {control.action}
              </div>
              <div className="text-gray-600">
                {control.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <p className="text-gray-700">
          <span className="font-bold">💡 Pro Tip:</span> Practice makes perfect! 
          The controls are intentionally clumsy to simulate a surgeon's challenging movements.
        </p>
      </div>
    </section>
  )
}
