import { component$, useStylesScoped$, useStore, $ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import styles from './index.css?inline'
import Toggle from '~/components/Toggle/Toggle'
import tokensStruct from '~/lib/tokensStruct'

export default component$(() => {
  useStylesScoped$(styles)
  const activeTokens = useStore({
    colors: false,
  })

  const tokensValues = useStore(() => {
    const values: Record<string, { value: string; cssVariable: string }> = {}
    
    Object.entries(tokensStruct).forEach(([, tokens]) => {
      Object.entries(tokens).forEach(([key, cssVariable]) => {
        values[key] = {
          value: '',
          cssVariable,
        }
      })
    })

    return values
  })

  const handleToggle = $((event: Event) => {
    const target = event.target as HTMLInputElement
    activeTokens[target.id as keyof typeof activeTokens] = target.checked
  })

  return (
    <main>
      <div class="page-header">
        <h1>Vanilla CSS design system builder.</h1>
        <h2>Just configure the tokens you need, copy the result from the CSS output and start building!</h2>
      </div>
      <div class="content">
        <section>
          <h1 class="title">TOKENS</h1>
          <ul class="tokens">
            {
              Object.entries(tokensStruct).map(([key, tokens]) => (
                <li key={key} class="token-container">
                  <div class="token-header">
                    <p class="token-title">{key}</p>
                    <Toggle
                      id={key}
                      checked={activeTokens[key as keyof typeof activeTokens]}
                      onChange$={handleToggle}
                    />
                  </div>
                  <div
                    class={[
                      'token-values-container',
                      { active: activeTokens[key as keyof typeof activeTokens] }
                    ]}
                  >
                    <ul
                      class="token-values"
                    >
                      {Object.keys(tokens).map((key) => (
                        <li key={key}>
                          <p>{key}</p>
                          <input id={key} type="text" value={tokensValues[key].value} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))
            }
          </ul>
        </section>
        <section>css</section>
      </div>
    </main>
  )
})

export const head: DocumentHead = {
  title: 'cascade',
  meta: [
    {
      name: 'description',
      content: 'Vanilla CSS design system builder.',
    },
  ],
}
