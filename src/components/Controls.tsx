export default function Controls() {
  const controls = [
    {
      key: 'A',
      icon: '👈',
      action: 'Left finger grip',
      description: 'Control the left hand finger',
    },
    {
      key: 'W',
      icon: '👉',
      action: 'Right finger grip',
      description: 'Control the right hand finger',
    },
    {
      key: 'E',
      icon: '🔄',
      action: 'Rotate hand',
      description: 'Rotate the surgeon hand',
    },
    {
      key: 'R',
      icon: '🖐️',
      action: 'Toggle hand',
      description: 'Switch between left and right hand',
    },
    {
      key: 'Mouse',
      icon: '🖱️',
      action: 'Move hand',
      description: 'Control the hand movement',
    },
  ]

  return (
    <section className="panel panel-narrow">
      <div className="panel-body">
        <h2 className="text-2xl md:text-3xl font-bold text-game-dark mb-6 flex items-center gap-3">
          <span className="text-4xl">🎮</span>
          Game Controls
        </h2>

        <div className="controls-grid">
          {controls.map((control) => (
            <article key={control.key} className="control-card">
              <span className="control-icon" aria-hidden="true">
                {control.icon}
              </span>
              <div className="flex-1 min-w-0">
                <kbd className="control-key">{control.key}</kbd>
                <div className="control-title">{control.action}</div>
                <p className="control-desc">{control.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="control-tip">
          <p>
            <span className="font-bold">💡 Pro Tip:</span> Practice makes perfect! The controls are
            intentionally clumsy to simulate a surgeon&apos;s challenging movements.
          </p>
        </div>
      </div>
    </section>
  )
}
