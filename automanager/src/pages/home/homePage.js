import Card from '../../components/home-components/card/card.js'
import ImageHome from '../../img/ImageHome.jpg'
import styles from './homepage.module.css'

function HomePage() {
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
                    <Card
                        title="Controle Total"
                        message="Gerencie todo o estoque em um único painel."
                    />
                    <Card
                        title="Localização"
                        message="Saiba exatamente em qual vaga ou pátio o carro está."
                    />
                    <Card
                        title="Visual Rápido"
                        message="Veja os carros em cards com fotos e status."
                    />
                    <Card
                        title="Busca Avançada"
                        message="Encontre carros por modelo, cor ou localização."
                    />
                    <Card
                        title="Status Visuais"
                        message="Disponível, Reservado, Vendido."
                    />
                </div>
            </div>
        </section>
    )
}

export default HomePage