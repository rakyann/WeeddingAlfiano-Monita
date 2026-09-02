export interface GuestQueryParams {
  to: string;
  isVip: boolean;
  table: string | null;
}

export function parseGuestParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): GuestQueryParams {
  const rawTo = searchParams.to;
  let guestName = 'Tamu Undangan';

  if (typeof rawTo === 'string' && rawTo.trim().length > 0) {
    try {
      guestName = decodeURIComponent(rawTo.trim());
    } catch {
      guestName = rawTo.trim();
    }
  } else if (Array.isArray(rawTo) && rawTo[0]) {
    try {
      guestName = decodeURIComponent(rawTo[0].trim());
    } catch {
      guestName = rawTo[0].trim();
    }
  }

  const rawVip = searchParams.vip;
  const isVip = rawVip === 'true' || rawVip === '1';

  const rawTable = searchParams.table;
  const table = typeof rawTable === 'string' ? rawTable : null;

  return {
    to: guestName,
    isVip,
    table,
  };
}

export function buildGuestInvitationUrl(
  baseUrl: string,
  guestName: string,
  options?: { isVip?: boolean; table?: string }
): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const params = new URLSearchParams();
  params.set('to', guestName);
  if (options?.isVip) params.set('vip', 'true');
  if (options?.table) params.set('table', options.table);

  return `${cleanBase}/?${params.toString()}`;
}

export function generateWhatsAppMessage(
  guestName: string,
  invitationUrl: string,
  brideGroomNames: string = 'Alifano & Monita'
): string {
  return `Kepada Yth.
Bapak/Ibu/Saudara/i *${guestName}*

_Assalamu’alaikum Warahmatullahi Wabarakatuh_

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk menghadiri acara pernikahan kami:

✨ *The Wedding of ${brideGroomNames}* ✨

🗓️ *Hari/Tanggal:* Minggu, 13 September 2026
📍 *Lokasi:* Lembayung, Baturaden, Banyumas

Silakan buka tautan undangan digital di bawah ini untuk melihat detail acara, konfirmasi kehadiran (RSVP), serta doa restu:
${invitationUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

_Wassalamu’alaikum Warahmatullahi Wabarakatuh_
Hormat kami yang berbahagia,
*Alifano & Monita*`;
}
