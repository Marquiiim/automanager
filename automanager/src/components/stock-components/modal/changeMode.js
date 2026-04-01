import styles from './changeMode.module.css';

function ChangeMode({ id }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        Gerênciamento de Produto
                    </h2>
                    <button className={styles.closeButton}>×</button>
                </div>

                <form className={styles.modalForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Nome do produto</label>
                        <input
                            type="text"
                            placeholder="Nome do produto"
                            className={styles.formInput}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Categoria do produto</label>
                        <select
                            name="categoria"
                            id="categoria"
                            className={styles.formSelect}
                        >
                            <option value="">Selecione uma categoria</option>
                            <option value="manutencao">Manutenção & Lubrificação</option>
                            <option value="freios">Sistema de Freios</option>
                            <option value="suspensao">Suspensão & Direção</option>
                            <option value="motor">Motor & Transmissão</option>
                            <option value="pneus">Pneus & Rodas</option>
                            <option value="eletrica">Elétrica & Iluminação</option>
                            <option value="ar_condicionado">Ar-Condicionado</option>
                            <option value="carroceria">Carroceria & Estética</option>
                            <option value="acessorios">Acessórios Internos</option>
                            <option value="ferramentas">Ferramentas & Equipamentos</option>
                        </select>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Quantidade</label>
                            <input
                                type="number"
                                placeholder="Quantidade"
                                className={styles.formInput}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Preço Unitário</label>
                            <input
                                type="number"
                                placeholder="Preço unitário"
                                className={styles.formInput}
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.saveButton}
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangeMode