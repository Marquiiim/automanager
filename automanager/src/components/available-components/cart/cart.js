import {
    forwardRef,
    useImperativeHandle,
    useState,
    useCallback,
    useEffect
} from 'react';
import {
    MdClose,
    MdShoppingCart,
    MdDelete,
    MdAdd,
    MdRemove
} from 'react-icons/md';
import styles from './cart.module.css'

const Cart = forwardRef(({ onClose, isOpen, onCartUpdate }, ref) => {
    const [cartItems, setCartItems] = useState([])

    const notifyUpdate = useCallback(() => {
        if (onCartUpdate) {
            const total = cartItems.reduce((sum, item) => sum + item.quantity, 0)
            onCartUpdate(total)
        }
    }, [cartItems, onCartUpdate])

    useEffect(() => {
        notifyUpdate()
    }, [cartItems, notifyUpdate])

    useImperativeHandle(ref, () => ({
        addToCart: (item) => {
            setCartItems(prev => {
                const existingItem = prev.find(i => i.id === item.id)
                if (existingItem) {
                    return prev.map(i =>
                        i.id === item.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    )
                }
                return [...prev, { ...item, quantity: 1 }]
            })
        },
        getCartItems: () => cartItems,
        clearCart: () => setCartItems([])
    }))

    const updateQuantity = useCallback((itemId, delta) => {
        setCartItems(prev => prev.map(item =>
            item.id === itemId
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        ))
    }, [])

    const removeItem = useCallback((itemId) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId))
    }, [])

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = cartItems.reduce((total, item) => total + (item.sale_price * item.quantity), 0)

    if (!isOpen) return null

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>
                        <MdShoppingCart /> Meu Carrinho ({totalItems} itens)
                    </h3>
                    <button onClick={onClose}>
                        <MdClose size={20} />
                    </button>
                </div>

                <div className={styles.modalBody}>
                    {cartItems.length > 0 ? (
                        <div className={styles.cartList}>
                            {cartItems.map(item => (
                                <div key={item.id} className={styles.cartItem}>
                                    <div className={styles.itemInfo}>
                                        <h4 className={styles.itemName}>{item.name}</h4>
                                        <p className={styles.itemPrice}>
                                            R$ {Number(item.sale_price).toFixed(2)} / un
                                        </p>
                                    </div>

                                    <div className={styles.itemActions}>
                                        <div className={styles.quantityControl}>
                                            <button onClick={() => updateQuantity(item.id, -1)}
                                                className={styles.quantityBtn}>
                                                <MdRemove size={14} />
                                            </button>
                                            <span className={styles.quantity}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}
                                                className={styles.quantityBtn}>
                                                <MdAdd size={14} />
                                            </button>
                                        </div>

                                        <div className={styles.itemTotal}>
                                            R$ {(item.sale_price * item.quantity).toFixed(2)}
                                        </div>

                                        <button onClick={() => removeItem(item.id)}
                                            className={styles.removeBtn}>
                                            <MdDelete size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyCart}>
                            <MdShoppingCart size={48} />
                            <p>Seu carrinho está vazio</p>
                            <span>Adicione produtos para continuar</span>
                        </div>
                    )}
                </div>


                <div className={styles.modalFooter}>
                    <div className={styles.totalSection}>
                        <span className={styles.totalLabel}>Total:</span>
                        <span className={styles.totalValue}>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                    <button className={styles.checkoutButton}>
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
    )
})

export default Cart