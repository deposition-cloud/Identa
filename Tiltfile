version_settings(constraint='>=0.32.0')

allow_k8s_contexts('kind-kind')

config.define_string('port', args=False, usage='Host port to forward the app to (default 3000)')
cfg = config.parse()
APP_PORT = cfg.get('port', os.getenv('IDENTA_PORT', '3000'))

# ── Image ──────────────────────────────────────────────────────────────────────

docker_build(
    'localhost:5000/identa',
    context='.',
    target='dev',
    ignore=['.git', '*.md', 'docs/', '.agents/', '.nuxt/', '.output/', 'node_modules/'],
    live_update=[
        sync('app/', '/app/app/'),
        sync('public/', '/app/public/'),
        sync('nuxt.config.ts', '/app/nuxt.config.ts'),
        run(
            'cd /app && pnpm install --prefer-offline',
            trigger=['package.json', 'pnpm-lock.yaml'],
        ),
    ],
)

# ── Helm release ───────────────────────────────────────────────────────────────

k8s_yaml(
    helm(
        './charts/identa',
        name='identa',
        values=['./charts/identa/values.local.yaml'],
    )
)

k8s_resource(
    'identa',
    port_forwards=['%s:3000' % APP_PORT],
    labels=['app'],
)

# ── Watch sources outside of docker build context ──────────────────────────────

watch_file('app/')
watch_file('nuxt.config.ts')
