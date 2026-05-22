import { SITE } from '../../lib/site-data';
import { WhatsAppIcon } from './SocialIcons';

/**
 * Floating WhatsApp button — sits ABOVE the ChatBot trigger.
 * Both use safe-area-inset-bottom so they don't collide with iOS home indicator.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Creavix on WhatsApp"
      title="WhatsApp · Tap to chat"
      className="whatsapp-float"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="sr-only">WhatsApp {SITE.whatsapp}</span>
    </a>
  );
}
