import { component$, useStylesScoped$, type QRL } from '@builder.io/qwik'
import styles from './toggle.css?inline'

export interface ToggleProps {
  id: string
  checked: boolean
  onChange$: QRL<(event: Event) => void>
}

export default component$<ToggleProps>(({ id, checked = false, onChange$ = () => {} }) => {
  useStylesScoped$(styles)

  return (
    <div class="checkbox">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange$={(event) => onChange$(event)}
      />
      <label></label>
    </div>
  )
})
