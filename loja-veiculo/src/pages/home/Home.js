import Cards from '../../components/home-components/cards/cards'
import ImageHome from '../../img/ImageHome.jpg'
import styles from './Home.module.css'

function Home() {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <img
                        src={ImageHome}
                        className={styles.dealershipImage}
                        alt='Concessionária'
                    />
                    <div className={styles.overlay}></div>
                    <div className={styles.overlayContent}>
                        <div className={styles.brand}>
                            <h1 className={styles.brandName}>AUTOMANAGER</h1>
                            <p className={styles.slogan}>
                                Gerencie seu estoque com inteligência, venda com velocidade.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.cardsGrid}>
                    <Cards
                        title="Controle Total"
                        message="Gerencie todo o estoque em um único painel."
                    />
                    <Cards
                        title="Localização"
                        message="Saiba exatamente em qual vaga ou pátio o carro está."
                    />
                    <Cards
                        title="Visual Rápido"
                        message="Veja os carros em cards com fotos e status."
                    />
                    <Cards
                        title="Busca Avançada"
                        message="Encontre carros por modelo, cor ou localização."
                    />
                    <Cards
                        title="Status Visuais"
                        message="Disponível, Reservado, Vendido."
                    />
                </div>
            </div>
        </section>
    )
}

export default Home