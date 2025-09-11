import { PlayerChip } from '../store/enums/player-chip'
import iron_chip from '../images/iron-chip.png'
import hat_chip from '../images/hat-chip.png'
import cart_chip from '../images/cart-chip.png'
import penguin_chip from '../images/penguin-chip.png'
import thimble_chip from '../images/thimble-chip.png'

export function definePlayerChipIcon(playerChip: PlayerChip): string {
    switch (playerChip) {
        case PlayerChip.CART: return cart_chip
        case PlayerChip.HAT: return hat_chip
        case PlayerChip.IRON: return iron_chip
        case PlayerChip.PENGUIN: return penguin_chip
        case PlayerChip.THIMBLE: return thimble_chip
        default: return ''
    }
}