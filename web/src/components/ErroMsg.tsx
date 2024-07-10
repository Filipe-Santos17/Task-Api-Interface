export default function ErroMsg({ erro }: { erro: string | boolean }) {
  if (!erro) return null;
  return <p className="font-normal text-xs tracking-tighter text-red">{erro}</p>;
}