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
    const [letraClicada, setLetraClicada] = useState(["desativado"])
    const [chances, setChances] = useState(imagens[0])
    const [fimDeJogo, setFimDeJogo] = useState("")
    const [palpite, setPalpite] = useState("")

    function iniciarJogo() {
        setDesabilitados(desabilitados === true ? false : false)
        setLetraClicada([])

        const palavra = Math.floor(Math.random() * palavras.length)
        const novaPalavra = (palavras[palavra]);

        setPalavraEscolhida(novaPalavra)
        console.log(novaPalavra)

        let numEspacos = [];
        for (let i = 0; i < novaPalavra.length; i++) {
            numEspacos.push("_ ")
        }
        setEspacos([...numEspacos])
        setChances(imagens[0])
        setFimDeJogo("")
    }

    function escolherLetra(letra) {

        if (desabilitados === false && letraClicada.includes(letra) !== true) {
            setLetraClicada([...letraClicada, letra])

            let semAcento = palavraEscolhida.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            if (semAcento.includes(letra)) {
                for (let i = 0; i < palavraEscolhida.length; i++) {
                    if (semAcento[i] === letra) {
                        espacos[i] = palavraEscolhida[i]
                        if (!espacos.includes("_ ")) {
                            setFimDeJogo(true)
                            setLetraClicada("desativado")
                            setDesabilitados(true)
                            alert("Você venceu a forca! Parabéns!")
                        }
                    }
                }
            } else {
                for (let p = 0; p < imagens.length; p++) {
                    if (imagens[p] === chances) {
                        setChances(imagens[p + 1])
                        if (!imagens[p + 2]) {
                            setEspacos(palavraEscolhida)
                            setFimDeJogo(false)
                            setLetraClicada("desativado")
                            setDesabilitados(true)
                            alert("Infelizmente não foi dessa vez! Não desista!")
                        }
                    }
                }
            }

        } else {
            if(desabilitados === true) {
                alert("Clique em 'Escolher Palavra' para iniciar o jogo!")
            } else {
                alert("Você já escolheu essa letra")
            }
        }
    }

    function chutar() {
        if (palpite === palavraEscolhida) {
            setEspacos(palavraEscolhida)
            setFimDeJogo(true)
            setPalpite("")
            setLetraClicada("desativado")
            setDesabilitados(true)
            alert("Na mosca! Partiu mais uma palavra?")
        } else {
            setChances(imagens[6])
            setFimDeJogo(false)
            setPalpite("")
            setLetraClicada("desativado")
            setDesabilitados(true)
            setEspacos(palavraEscolhida)
            alert("Hmmmm, não chutou legal! Bora pra próxima!")
        }
    }

    const letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", , "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    return (
        <>
            <div className="tela-inteira">
                <div className="tela-superior">
                    <img data-identifier="game-image" src={chances} alt="Imagem da forca" />
                    <div className="alinhado-direita">
                        <button data-identifier="choose-word" className="escolher-palavra" onClick={iniciarJogo}>Escolher Palavra</button>
                        <div className="palavra-vazia">
                            <p data-identifier="word" className={fimDeJogo === "" ? "underline" : fimDeJogo === true ? "underline green" : "underline red"}>{espacos}</p>
                        </div>
                    </div>
                </div>
                <div className={"botoes-letras"}>
                    {letras.map((l) =>
                        <button onClick={() => escolherLetra(l)}
                            className={letraClicada.includes("desativado") ? "letra-clicada" : letraClicada.includes(l) ? "letra-clicada" : "letra"}>
                            <p data-identifier="letter" disabled={desabilitados} ><ImprimirBotoesLetras letra={l.toUpperCase()} /></p>
                        </button>)}
                </div>
            </div>
            <div className="chutar-palavra">
                <p>Já sei a palavra!</p>
                <input disabled={desabilitados}
                    data-identifier="type-guess"
                    onChange={evt => setPalpite(evt.target.value)}
                    value={palpite}></input>
                <button data-identifier="guess-button" onClick={chutar}>Chutar</button>
            </div>
        </>
    )
}