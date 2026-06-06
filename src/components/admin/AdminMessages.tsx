'use client';

import { useEffect, useState } from 'react';
import { Check, Download, Loader2, Mail, MailOpen } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { downloadCsv } from '@/lib/utils';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  handled: boolean;
  createdAt: string;
}

interface Subscriber {
  id: string;
  email: string;
  locale: string;
  createdAt: string;
}

export default function AdminMessages({ t }: { t: (k: string) => string }) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'messages' | 'subscribers'>('messages');

  useEffect(() => {
    fetch('/api/admin/messages')
      .then((r) => r.json())
      .then((d) => {
        setMessages(d.messages ?? []);
        setSubscribers(d.subscribers ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleHandled = async (id: string, handled: boolean) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, handled } : m)),
    );
    const res = await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, handled }),
    });
    if (!res.ok) toast('Hata', 'error');
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={26} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 font-serif text-3xl">{t('inbox')}</h2>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setTab('messages')}
          className={`rounded-full px-4 py-2 text-xs ${
            tab === 'messages' ? 'bg-gold text-charcoal' : 'bg-ivory/5 text-ivory/60'
          }`}
        >
          {t('messages')} ({messages.length})
        </button>
        <button
          onClick={() => setTab('subscribers')}
          className={`rounded-full px-4 py-2 text-xs ${
            tab === 'subscribers' ? 'bg-gold text-charcoal' : 'bg-ivory/5 text-ivory/60'
          }`}
        >
          {t('subscribers')} ({subscribers.length})
        </button>
      </div>

      {tab === 'messages' ? (
        <div className="space-y-3">
          {messages.length === 0 && (
            <p className="text-sm text-ivory/40">{t('noMessages')}</p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-xl border p-4 ${
                m.handled
                  ? 'border-ivory/5 bg-charcoal/40 opacity-60'
                  : 'border-ivory/10 bg-charcoal'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ivory">{m.name}</p>
                  <p className="text-xs text-ivory/45">
                    {m.email}
                    {m.phone ? ` · ${m.phone}` : ''}
                  </p>
                </div>
                <button
                  onClick={() => toggleHandled(m.id, !m.handled)}
                  className="flex items-center gap-1.5 rounded-full border border-ivory/15 px-3 py-1 text-xs text-ivory/60 transition hover:text-gold"
                >
                  {m.handled ? <MailOpen size={13} /> : <Mail size={13} />}
                  {m.handled ? t('handled') : t('markHandled')}
                </button>
              </div>
              {m.subject && (
                <p className="mt-2 text-sm font-medium text-gold">{m.subject}</p>
              )}
              <p className="mt-1 text-sm text-ivory/70">{m.message}</p>
              <p className="mt-2 text-[0.65rem] text-ivory/30">
                {new Date(m.createdAt).toLocaleString('tr-TR')}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ivory/10">
          <div className="flex justify-end border-b border-ivory/10 bg-charcoal p-2">
            <button
              onClick={() =>
                downloadCsv(
                  `subscribers-${new Date().toISOString().slice(0, 10)}.csv`,
                  subscribers.map((s) => ({
                    email: s.email,
                    locale: s.locale,
                    date: new Date(s.createdAt).toLocaleDateString('tr-TR'),
                  })),
                )
              }
              className="flex items-center gap-2 rounded-full border border-ivory/15 px-4 py-1.5 text-xs text-ivory/70 transition hover:border-gold hover:text-gold"
            >
              <Download size={13} /> CSV
            </button>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-charcoal text-xs uppercase tracking-wider text-ivory/40">
              <tr>
                <th className="px-4 py-3">E-posta</th>
                <th className="px-4 py-3">Dil</th>
                <th className="px-4 py-3">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-t border-ivory/5">
                  <td className="px-4 py-3 text-ivory/80">{s.email}</td>
                  <td className="px-4 py-3 uppercase text-ivory/50">{s.locale}</td>
                  <td className="px-4 py-3 text-ivory/50">
                    {new Date(s.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-ivory/40">
                    —
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
