import React from "react";
import { LogoCaixa, LogoTitulo, LogoSubtitulo, LogoTitulo2} from "./style";

export default function Logo({ size = "normal" }) {
  return (
    <LogoCaixa>
      <LogoTitulo className={size}>Banks</LogoTitulo>
      <LogoTitulo2 className={size}>Bankário</LogoTitulo2>
      <LogoSubtitulo>Banco do Desesepero</LogoSubtitulo>
    </LogoCaixa>
  );
}
