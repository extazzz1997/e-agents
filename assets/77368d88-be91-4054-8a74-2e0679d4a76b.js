/* global React, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio */
const { useEffect } = React;

const ACCENTS = {
  "Оранжевый": { accent:"#e9580a", press:"#cf4c05", soft:"#fcebdd", tint:"#fdf3ea", rgb:"233,88,10",  light:"#f1b083" },
  "Бирюзовый": { accent:"#0d9488", press:"#0b7a70", soft:"#d8f1ee", tint:"#ecf8f6", rgb:"13,148,136",  light:"#6fd3c7" },
  "Индиго":    { accent:"#4f46e5", press:"#4338ca", soft:"#e4e2fb", tint:"#f0effd", rgb:"79,70,229",   light:"#a79ff3" },
};
const SWATCH = { "Оранжевый":"#e9580a", "Бирюзовый":"#0d9488", "Индиго":"#4f46e5" };

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "Оранжевый",
  "font": "Geologica"
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const a = ACCENTS[t.accent] || ACCENTS["Оранжевый"];
    const r = document.documentElement.style;
    r.setProperty("--accent", a.accent);
    r.setProperty("--accent-press", a.press);
    r.setProperty("--accent-soft", a.soft);
    r.setProperty("--accent-tint", a.tint);
    r.setProperty("--accent-rgb", a.rgb);
    r.setProperty("--accent-light", a.light);
  }, [t.accent]);

  useEffect(() => {
    document.documentElement.style.setProperty("--font", `'${t.font}', system-ui, sans-serif`);
  }, [t.font]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Акцент" />
      <TweakColor
        label="Цвет"
        value={SWATCH[t.accent]}
        options={Object.values(SWATCH)}
        onChange={(hex) => {
          const name = Object.keys(SWATCH).find(k => SWATCH[k] === hex) || "Оранжевый";
          setTweak("accent", name);
        }}
      />
      <TweakSection label="Типографика" />
      <TweakRadio
        label="Шрифт"
        value={t.font}
        options={["Manrope", "Geologica"]}
        onChange={(v) => setTweak("font", v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<TweaksApp />);
