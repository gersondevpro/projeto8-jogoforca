import "./styles/reset.css"
import "./styles/style.css"
import forca0 from "./assets/forca0.png"
import forca1 from "./assets/forca1.png"
import forca2 from "./assets/forca2.png"
import forca3 from "./assets/forca3.png"
import forca4 from "./assets/forca4.png"
import forca5 from "./assets/forca5.png"
import forca6 from "./assets/forca6.png"
import palavras from "./palavras"
import { useState } from "react"

function ImprimirBotoesLetras(props) {
    return (
        <>
            {props.letra}
        </>
    )
}

const imagens = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]

export default function App() {
    const [desabilitados, setDesabilitados] = useState(true)
    const [palavraEscolhida, setPalavraEscolhida] = useState([])
    const [espacos, setEspacos] = useState("")
    const [letraClicada, setLetraClicada] = useState([])
    const [chances, setChances] = useState(imagens[0])
    const [fimDeJogo, setFimDeJogo] = useState("")
    const [palpite, setPalpite] = useState("")

    function iniciarJogo() {
        setDesabilitados(desabilitados === true ? false : false)

        const palavra = Math.floor(Math.random() * palavras.length)
        const novaPalavra = (palavras[palavra]);
        
        setPalavraEscolhida(novaPalavra)
        console.log(novaPalavra)

        let numEspacos = [];
        for (let i = 0; i < novaPalavra.length; i++) {
            numEspacos.push("_ ")
        }
        setEspacos([...numEspacos])
    }

    function escolherLetra(letra) {

        if (desabilitados === false) {
            setLetraClicada([...letraClicada, letra])

            let semAcento = palavraEscolhida.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            if (semAcento.includes(letra)) {
                for (let i = 0; i < palavraEscolhida.length; i++) {
                    if (semAcento[i] === letra) {
                        espacos[i] = palavraEscolhida[i]
                        if (!espacos.includes("_ ")) {
                            setFimDeJogo(true)
                        }
                    }
                }
            } else {
                for (let p = 0; p < imagens.length; p++) {
                    if (imagens[p] === chances) {
                        setChances(imagens[p + 1])
                        if (!imagens[p + 2]) {
                            setFimDeJogo(false)
                        }
                    }
                }
            }

        } else {
            alert("Clique em 'Escolher Palavra' para iniciar o jogo!")
        }
    }

    function chutar() {
        if (palpite === palavraEscolhida) {
            setEspacos(palavraEscolhida)
            setFimDeJogo(true)
            setPalpite("")
        } else {
            setChances(imagens[6])
            setFimDeJogo(false)
            setPalpite("")
        }
    }

    const letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", , "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    return (
        <>
            <div className="tela-inteira">
                <div className="tela-superior">
                    <img src={chances} alt="Imagem da forca" />
                    <div className="alinhado-direita">
                        <button className="escolher-palavra" onClick={iniciarJogo}>Escolher Palavra</button>
                        <div className="palavra-vazia">
                            <p className={fimDeJogo === "" ? "underline" : fimDeJogo === true ? "underline green" : "underline red"}>{espacos}</p>
                        </div>
                    </div>
                </div>
                <div className={"botoes-letras"}>
                    {letras.map((l) =>
                        <button onClick={() => escolherLetra(l)}
                            className={letraClicada.includes(l) ? "letra-clicada" : "letra"}>
                            <p disabled={desabilitados}><ImprimirBotoesLetras letra={l.toUpperCase()} /></p>
                        </button>)}
                </div>
            </div>
            <div className="chutar-palavra">
                <p>Já sei a palavra!</p>
                <input disabled={desabilitados}
                    onChange={evt => setPalpite(evt.target.value)}
                    value={palpite}></input>
                <button onClick={chutar}>Chutar</button>
            </div>
        </>
    )
}