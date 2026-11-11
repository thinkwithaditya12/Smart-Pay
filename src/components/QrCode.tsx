import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

type Props = {
  value: string;
  size?: number;
  className?: string;
  label?: string;
};

/**
 * Renders any payment string (UPI intent, receipt link) as a scannable QR.
 * Drawn on a light plate so phone cameras lock on reliably.
 */
export default function QrCode({ value, size = 148, className = '', label }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    QRCode.toString(value, {
      type: 'svg',
      margin: 0,
      errorCorrectionLevel: 'M',
      color: { dark: '#0a0b0d', light: '#ffffff' },
    })
      .then((svg) => {
        if (mounted.current) {
          setSrc(`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`);
        }
      })
      .catch(() => {
        if (mounted.current) setSrc(null);
      });
    return () => {
      mounted.current = false;
    };
  }, [value]);

  return (
    <div className={`qr ${className}`} style={{ width: size }}>
      <div className="qr-plate" style={{ width: size, height: size }}>
        {src ? <img src={src} alt={label ?? 'Payment QR code'} width={size} height={size} /> : <span className="qr-fallback" />}
      </div>
      {label ? <span className="qr-label">{label}</span> : null}
    </div>
  );
}
