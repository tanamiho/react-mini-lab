// src/pages/Day1.tsx （長さ維持：全部「あ」に変換）
import { useRef } from "react";

// 文字列の「全ての文字」を「あ」に（uフラグで絵文字も1文字扱い）
const toAllA = (v: string) => v.replace(/[\s\S]/gu, "あ");

export default function Day1_AllA() {
    const ref = useRef<HTMLInputElement>(null);
    const composingRef = useRef(false); // IME変換中フラグ

    const convertNow = () => {
        const el = ref.current!;
        const before = el.value;
        const sel = el.selectionStart ?? before.length; // ざっくり保存
        const after = toAllA(before);
        if (after !== before) {
            el.value = after;
            // 可能な限りカーソル位置維持（末尾寄せ）
            const pos = Math.min(sel, after.length);
            try { el.setSelectionRange(pos, pos); } catch { }
        }
    };

    const convertNextFrame = () => requestAnimationFrame(convertNow);

    return (
        <section className="day1-center">
            <h2>文字を入力してね・・・</h2>
            <input
                ref={ref}
                defaultValue=""
                // IME
                onCompositionStart={() => { composingRef.current = true; }}
                onCompositionEnd={() => { composingRef.current = false; convertNextFrame(); }}

                // 通常入力（英数/記号/Backspace/矢印など含む）
                onInput={(e) => {
                    // 変換中は触らない（確定でまとめて変換）
                    if ((e as any).isComposing || composingRef.current) return;
                    convertNow();
                }}

                // Undo/Redo・ペースト等の特殊操作（Safari/Chrome対策）
                onBeforeInput={(e) => {
                    const t = (e as any).inputType as string | undefined;
                    if (
                        t === "historyUndo" || t === "historyRedo" ||
                        t === "insertFromPaste" || t === "insertFromDrop"
                    ) convertNextFrame();
                }}

                // マウス/OS操作由来（念のため次フレームで統一）
                onPaste={() => convertNextFrame()}
                onDrop={() => convertNextFrame()}
                onCut={() => convertNextFrame()}

                // 入力体験の邪魔をしない補助
                inputMode="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="全て「あ」に変換される入力欄（長さ維持）"
                style={{
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid #243046",
                    background: "#0f141b",
                    color: "#e8eaf0",
                    width: "min(420px, 90vw)",   // 画面に合わせて縮む
                    textAlign: "center",         // 入力中の文字も中央寄せ（任意）
                }}
            />
        </section>
    );
}
