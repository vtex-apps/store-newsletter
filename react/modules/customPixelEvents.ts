import { CustomPixelEventInterface } from '../interfaces/custom-pixel-event.interface'

/**
 * Fires custom pixel event
 *
 * @param {string} eventName - Event name
 * @param {mixed} [eventData] - Event data
 */
export const triggerPixelEvent = (
  eventName: string,
  eventData?: CustomPixelEventInterface
): void => {
  if (typeof window === 'undefined' || !('postMessage' in window)) return

  const origin = '*'

  const data = {
    ...eventData,
    eventName,
  }

  window.postMessage(data, origin)
}

/**
 * Fires custom pixel event for newsletter
 *
 * @param {CustomPixelEventInterface} [eventData] - Event additional data
 */
export const triggerPixelNewsletterEvent = (
  eventData?: CustomPixelEventInterface
): void => {
  const { href } = window.location
  const data = {
    ...eventData,
    pageUrl: href,
  }

  triggerPixelEvent('vtex:newsletterSubscription', data)
}
