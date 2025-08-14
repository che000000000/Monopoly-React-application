import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserRole } from "./enums/user-role";
import { GameFieldType } from "./enums/game-field-type";
import { GameFieldColor } from "./enums/game-field-color";
import { PlayerChip } from "./enums/player-chip";
import { GameChatMessageT, GamesStateT } from "./types/games";
import { PlayerStatus } from "./enums/player-status";

const initialState: GamesStateT = {
    
    games: [],
    currentPlayer: {
        id: '1',
        name: 'видеокал-',
        avatarUrl: 'https://avatars.mds.yandex.net/get-shedevrum/11511289/f64db62ec6d411eebe70aa2339796401/orig',
        chip: PlayerChip.CART,
        turnNumber: 1,
        status: PlayerStatus.IS_TURN_OWNER,
        balance: 1500,
        role: UserRole.REGULAR
    },
    currentGame: {
        id: '1',
        currentTurn: null,
        players: [
            {
                id: '1',
                name: 'видеокал-',
                avatarUrl: 'https://avatars.mds.yandex.net/get-shedevrum/11511289/f64db62ec6d411eebe70aa2339796401/orig',
                chip: PlayerChip.CART,
                turnNumber: 1,
                status: PlayerStatus.IS_TURN_OWNER,
                balance: 1500,
                role: UserRole.REGULAR
            },
            {
                id: '3',
                name: 'Русец отсосской кратодемии',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGB3V-tAqVQV4bwaakhE54_sbT_MBKBX1Pv4pTktsdsILoyR46',
                chip: PlayerChip.HAT,
                turnNumber: 2,
                status: PlayerStatus.COMMON,
                balance: 1500,
                role: UserRole.REGULAR
            },
            {
                id: '4',
                name: 'Sn1k',
                avatarUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrg-RoaiWeDBlA0VQcaAHtgvpzsrUaLHaZsJSOxQ2Tz1ITjK6x',
                chip: PlayerChip.IRON,
                turnNumber: 3,
                status: PlayerStatus.COMMON,
                balance: 1500,
                role: UserRole.REGULAR
            },
            {
                id: '2',
                name: 'Koka',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                chip: PlayerChip.PENGUIN,
                turnNumber: 4,
                status: PlayerStatus.IS_LEFT,
                balance: 1500,
                role: UserRole.REGULAR
            },
            {
                id: '9',
                name: 'Алекс вы абсолютно непримемлимы',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                chip: PlayerChip.THIMBLE,
                turnNumber: 4,
                status: PlayerStatus.IS_LEFT,
                balance: 1500,
                role: UserRole.REGULAR
            },
        ],
        fields: [
            {
                id: '1',
                type: GameFieldType.GO,
                position: 1,
                name: "Старт",
                color: null,
                basePrice: null,
                housePrice: null,
                buildsCount: null,
                rent: null,
                owner: null,
                players: null
            },
            {
                id: '2',
                type: GameFieldType.PROPERTY,
                position: 2,
                name: "Житная ул.",
                color: GameFieldColor.BROWN,
                basePrice: 60,
                housePrice: 50,
                buildsCount: 0,
                rent: [2, 10, 30, 90, 160, 250],
                owner: null,
                players: null
            },
            {
                id: '3',
                type: GameFieldType.COMMUNITY_CHEST,
                position: 3,
                name: "Общественная казна",
                color: null,
                basePrice: null,
                housePrice: null,
                buildsCount: null,
                rent: null,
                owner: null,
                players: [
                    {
                        id: '4',
                        name: 'Sn1k',
                        avatarUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrg-RoaiWeDBlA0VQcaAHtgvpzsrUaLHaZsJSOxQ2Tz1ITjK6x',
                        chip: PlayerChip.IRON,
                        turnNumber: 3,
                        status: PlayerStatus.COMMON,
                        balance: 1500,
                        role: UserRole.REGULAR
                    },
                    {
                        id: '3',
                        name: 'Русец отсосской кратодемии',
                        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGB3V-tAqVQV4bwaakhE54_sbT_MBKBX1Pv4pTktsdsILoyR46',
                        chip: PlayerChip.HAT,
                        turnNumber: 2,
                        status: PlayerStatus.COMMON,
                        balance: 1500,
                        role: UserRole.REGULAR
                    },
                    {
                        id: '2',
                        name: 'Koka',
                        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                        chip: PlayerChip.PENGUIN,
                        turnNumber: 4,
                        status: PlayerStatus.IS_LEFT,
                        balance: 1500,
                        role: UserRole.REGULAR
                    },
                    {
                        id: '1',
                        name: 'видеокал',
                        avatarUrl: 'https://avatars.mds.yandex.net/get-shedevrum/11511289/f64db62ec6d411eebe70aa2339796401/orig',
                        chip: PlayerChip.CART,
                        turnNumber: 1,
                        status: PlayerStatus.IS_TURN_OWNER,
                        balance: 1500,
                        role: UserRole.REGULAR
                    },
                ]
            },
            {
                id: '4',
                type: GameFieldType.PROPERTY,
                position: 4,
                name: "Нагаинская ул.",
                color: GameFieldColor.BROWN,
                basePrice: 60,
                housePrice: 50,
                buildsCount: 0,
                rent: [4, 20, 60, 180, 320, 450],
                owner: null,
                players: null
            },
            {
                id: '5',
                type: GameFieldType.TAX,
                position: 5,
                name: "Подоходный налог",
                color: null,
                basePrice: null,
                housePrice: null,
                buildsCount: 0,
                rent: [200],
                owner: null,
                players: null
            },
            {
                id: '6',
                type: GameFieldType.RAILROAD,
                position: 6,
                name: "Рижская железная дорога",
                color: null,
                basePrice: 200,
                housePrice: null,
                buildsCount: null,
                rent: [25, 50, 100, 200],
                owner: null,
                players: null
            },
            {
                id: '7',
                type: GameFieldType.PROPERTY,
                position: 7,
                name: "Варшавское шоссе",
                color: GameFieldColor.WHITE_MOON,
                basePrice: 100,
                housePrice: 50,
                buildsCount: 5,
                rent: [6, 30, 90, 270, 400, 550],
                owner: null,
                players: null
            },
            {
                id: '8',
                type: GameFieldType.CHANCE,
                position: 8,
                name: "Шанс",
                color: null,
                basePrice: null,
                housePrice: null,
                buildsCount: null,
                rent: null,
                owner: null,
                players: null
            },
            {
                id: '9',
                type: GameFieldType.PROPERTY,
                position: 9,
                name: "Ул. Огеева",
                color: GameFieldColor.WHITE_MOON,
                basePrice: 100,
                housePrice: 50,
                buildsCount: 5,
                rent: [6, 30, 90, 270, 400, 550],
                owner: null,
                players: null
            },
            {
                id: '10',
                type: GameFieldType.PROPERTY,
                position: 10,
                name: "Первая Парковая ул.",
                color: GameFieldColor.WHITE_MOON,
                basePrice: 120,
                housePrice: 50,
                buildsCount: 4,
                rent: [8, 40, 100, 300, 450, 600],
                owner: null,
                players: null
            },
            {
                id: '11',
                type: GameFieldType.JUST_VISITING,
                position: 11,
                name: "Просто посетили",
                color: null,
                basePrice: null,
                housePrice: null,
                buildsCount: null,
                rent: null,
                owner: null,
                players: null
            },
            {
                id: '12',
                type: GameFieldType.PROPERTY,
                position: 12,
                name: "Ул. Полякова",
                color: GameFieldColor.PURPLE,
                basePrice: 140,
                housePrice: 100,
                buildsCount: 0,
                rent: [10, 50, 150, 450, 625, 750],
                owner: null,
                players: null
            },
            {
                id: '13',
                type: GameFieldType.UTILITY,
                position: 13,
                name: "Мосэнерго",
                color: null,
                basePrice: 150,
                housePrice: null,
                buildsCount: null,
                rent: [4, 10],
                owner: null,
                players: null
            },
            {
                id: '14',
                type: GameFieldType.PROPERTY,
                position: 14,
                name: "Ул. Сретенка",
                color: GameFieldColor.PURPLE,
                basePrice: 140,
                housePrice: 100,
                buildsCount: 0,
                rent: [10, 50, 150, 450, 625, 750],
                owner: null,
                players: null
            },
            {
                id: '15',
                type: GameFieldType.PROPERTY,
                position: 15,
                name: "Ростовская набережная",
                color: GameFieldColor.PURPLE,
                basePrice: 160,
                housePrice: 100,
                buildsCount: 0,
                rent: [12, 60, 180, 500, 700, 900],
                owner: null,
                players: null
            },
            {
                id: '16',
                type: GameFieldType.RAILROAD,
                position: 16,
                name: "Курская железная дорога",
                color: null,
                basePrice: 200,
                housePrice: null,
                buildsCount: null,
                rent: [25, 50, 100, 200],
                owner: null,
                players: null
            },
            {
                id: '17',
                type: GameFieldType.PROPERTY,
                position: 17,
                name: "Рязанский проспект",
                color: GameFieldColor.ORANGE,
                basePrice: 180,
                housePrice: 100,
                buildsCount: 5,
                rent: [14, 70, 200, 550, 750, 950],
                owner: null,
                players: null
            },
            {
                id: '18',
                type: GameFieldType.COMMUNITY_CHEST,
                position: 18,
                name: "Общественная казна",
                color: null,
                basePrice: null,
                housePrice: null,
                buildsCount: null,
                rent: null,
                owner: null,
                players: null
            },
            {
                id: '19',
                type: GameFieldType.PROPERTY,
                position: 19,
                name: "Ул. Вавилова",
                color: GameFieldColor.ORANGE,
                basePrice: 180,
                housePrice: 100,
                buildsCount: 5,
                rent: [14, 70, 200, 550, 750, 950],
                owner: null,
                players: null
            },
            {
                id: '20',
                type: GameFieldType.PROPERTY,
                position: 20,
                name: "Рублевское шоссе",
                color: GameFieldColor.ORANGE,
                basePrice: 200,
                housePrice: 100,
                buildsCount: 4,
                rent: [16, 80, 220, 600, 800, 1000],
                owner: null,
                players: null
            },
            {
                id: '21',
                type: GameFieldType.FREE_PARKING,
                position: 21,
                name: "Бесплатная парковка",
                color: null,
                basePrice: null,
                housePrice: null,
                buildsCount: null,
                rent: null,
                owner: null,
                players: null
            },
            {
                id: '22',
                type: GameFieldType.PROPERTY,
                position: 22,
                name: "Ул. Тверская",
                color: GameFieldColor.RED,
                basePrice: 220,
                housePrice: 150,
                buildsCount: 0,
                rent: [18, 90, 250, 700, 875, 1050],
                owner: null,
                players: null
            },
            {
                id: '23',
                type: GameFieldType.CHANCE,
                position: 23,
                name: "Шанс",
                color: null,
                basePrice: null,
                housePrice: null,
                buildsCount: null,
                rent: null,
                owner: null,
                players: null
            },
            {
                id: '24',
                type: GameFieldType.PROPERTY,
                position: 24,
                name: "Пушкинская ул.",
                color: GameFieldColor.RED,
                basePrice: 220,
                housePrice: 150,
                buildsCount: 0,
                rent: [18, 90, 250, 700, 875, 1050],
                owner: null,
                players: null
            },
            {
                id: '25',
                type: GameFieldType.PROPERTY,
                position: 25,
                name: "Площадь Мояковского",
                color: GameFieldColor.RED,
                basePrice: 240,
                housePrice: 150,
                buildsCount: 0,
                rent: [20, 100, 300, 750, 925, 1100],
                owner: null,
                players: null
            },
            {
                id: '26',
                type: GameFieldType.RAILROAD,
                position: 26,
                name: "Казанская железная дорога",
                color: null,
                basePrice: 200,
                housePrice: null,
                buildsCount: null,
                rent: [25, 50, 100, 200],
                owner: null,
                players: null
            },
            {
                id: '27',
                type: GameFieldType.PROPERTY,
                position: 27,
                name: "Ул. Грузинский вал",
                color: GameFieldColor.YELLOW,
                basePrice: 260,
                housePrice: 150,
                buildsCount: 4,
                rent: [22, 110, 330, 800, 975, 1150],
                owner: null,
                players: null
            },
            {
                id: '28',
                type: GameFieldType.PROPERTY,
                position: 28,
                name: "Ул. Чайковского",
                color: GameFieldColor.YELLOW,
                basePrice: 260,
                housePrice: 150,
                buildsCount: 3,
                rent: [22, 110, 330, 800, 975, 1150],
                owner: null,
                players: null
            },
            {
                id: '29',
                type: GameFieldType.UTILITY,
                position: 29,
                name: "Мосисток",
                color: null,
                basePrice: 150,
                housePrice: null,
                buildsCount: null,
                rent: [4, 10],
                owner: null,
                players: null
            },
            {
                id: '30',
                type: GameFieldType.PROPERTY,
                position: 30,
                name: "Смоленская площадь",
                color: GameFieldColor.YELLOW,
                basePrice: 280,
                housePrice: 150,
                buildsCount: 4,
                rent: [24, 120, 360, 850, 1025, 1200],
                owner: null,
                players: null
            },
            {
                id: '31',
                type: GameFieldType.GO_TO_JAIL,
                position: 31,
                name: "Отправляйтесь в тюрьму",
                color: null,
                basePrice: null,
                housePrice: null,
                buildsCount: null,
                rent: null,
                owner: null,
                players: null
            },
            {
                id: '32',
                type: GameFieldType.PROPERTY,
                position: 32,
                name: "Ул. Щусева",
                color: GameFieldColor.GREEN,
                basePrice: 300,
                housePrice: 200,
                buildsCount: 0,
                rent: [26, 130, 390, 900, 1100, 1275],
                owner: null,
                players: null
            },
            {
                id: '33',
                type: GameFieldType.PROPERTY,
                position: 33,
                name: "Гоголевкий бульвар",
                color: GameFieldColor.GREEN,
                basePrice: 300,
                housePrice: 200,
                buildsCount: 0,
                rent: [26, 130, 390, 900, 1100, 1275],
                owner: null,
                players: null
            },
            {
                id: '34',
                type: GameFieldType.COMMUNITY_CHEST,
                position: 34,
                name: "Общественная казна",
                color: null,
                basePrice: null,
                housePrice: null,
                buildsCount: null,
                rent: null,
                owner: null,
                players: null
            },
            {
                id: '35',
                type: GameFieldType.PROPERTY,
                position: 35,
                name: "Кутузовский проспект",
                color: GameFieldColor.GREEN,
                basePrice: 320,
                housePrice: 200,
                buildsCount: 0,
                rent: [28, 150, 450, 1000, 1200, 1400],
                owner: null,
                players: null
            },
            {
                id: '36',
                type: GameFieldType.RAILROAD,
                position: 36,
                name: "Московская железная дорога",
                color: null,
                basePrice: 200,
                housePrice: null,
                buildsCount: null,
                rent: [25, 50, 100, 200],
                owner: null,
                players: null
            },
            {
                id: '37',
                type: GameFieldType.CHANCE,
                position: 37,
                name: "Шанс",
                color: null,
                basePrice: null,
                housePrice: null,
                buildsCount: null,
                rent: null,
                owner: null,
                players: null
            },
            {
                id: '38',
                type: GameFieldType.PROPERTY,
                position: 38,
                name: "Ул. Малая бронная",
                color: GameFieldColor.BLUE,
                basePrice: 350,
                housePrice: 200,
                buildsCount: 2,
                rent: [35, 175, 500, 1100, 1300, 1500],
                owner: null,
                players: null
            },
            {
                id: '39',
                type: GameFieldType.TAX,
                position: 39,
                name: "Сверхналог",
                color: null,
                basePrice: null,
                housePrice: null,
                buildsCount: null,
                rent: [100],
                owner: null,
                players: null
            },
            {
                id: '40',
                type: GameFieldType.PROPERTY,
                position: 40,
                name: "Ул. Арбат",
                color: GameFieldColor.BLUE,
                basePrice: 400,
                housePrice: 200,
                buildsCount: 3,
                rent: [50, 200, 600, 1400, 1700, 2000],
                owner: null,
                players: null
            }
        ],
        chatMessages: [
            {
                id: '1',
                text: 'Ходи чмоня',
                sender: {
                    id: '3',
                    name: 'Русец отсосской кратодемии',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGB3V-tAqVQV4bwaakhE54_sbT_MBKBX1Pv4pTktsdsILoyR46',
                    chip: PlayerChip.HAT,
                    role: UserRole.REGULAR
                },
                sentTime: '14:02'
            },
            {
                id: '2',
                text: 'Да иди нахуй',
                sender: {
                    id: '4',
                    name: 'Sn1k',
                    avatarUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrg-RoaiWeDBlA0VQcaAHtgvpzsrUaLHaZsJSOxQ2Tz1ITjK6x',
                    chip: PlayerChip.IRON,
                    role: UserRole.REGULAR
                },
                sentTime: '14:02'
            },
            {
                id: '3',
                text: 'Вы оба дебилы, я уже хожу',
                sender: {
                    id: '1',
                    name: 'видеокал-',
                    avatarUrl: 'https://avatars.mds.yandex.net/get-shedevrum/11511289/f64db62ec6d411eebe70aa2339796401/orig',
                    chip: PlayerChip.CART,
                    role: UserRole.REGULAR
                },
                sentTime: '14:03'
            },
            {
                id: '4',
                text: 'Кто последний - тот говна кусок',
                sender: {
                    id: '9',
                    name: 'Алекс вы абсолютно непримемлимы',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                    chip: PlayerChip.THIMBLE,
                    role: UserRole.REGULAR
                },
                sentTime: '14:03'
            },
            {
                id: '5',
                text: 'Пингвинчик, ты где?',
                sender: {
                    id: '3',
                    name: 'Русец отсосской кратодемии',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGB3V-tAqVQV4bwaakhE54_sbT_MBKBX1Pv4pTktsdsILoyR46',
                    chip: PlayerChip.HAT,
                    role: UserRole.REGULAR
                },
                sentTime: '14:04'
            },
            {
                id: '6',
                text: 'Я в тюрьме, как обычно',
                sender: {
                    id: '2',
                    name: 'Koka',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                    chip: PlayerChip.PENGUIN,
                    role: UserRole.REGULAR
                },
                sentTime: '14:04'
            },
            {
                id: '7',
                text: 'Лол, снова проиграл на старте?',
                sender: {
                    id: '4',
                    name: 'Sn1k',
                    avatarUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrg-RoaiWeDBlA0VQcaAHtgvpzsrUaLHaZsJSOxQ2Tz1ITjK6x',
                    chip: PlayerChip.IRON,
                    role: UserRole.REGULAR
                },
                sentTime: '14:05'
            },
            {
                id: '8',
                text: 'Да заткнитесь все, я думаю',
                sender: {
                    id: '1',
                    name: 'видеокал-',
                    avatarUrl: 'https://avatars.mds.yandex.net/get-shedevrum/11511289/f64db62ec6d411eebe70aa2339796401/orig',
                    chip: PlayerChip.CART,
                    role: UserRole.REGULAR
                },
                sentTime: '14:05'
            },
            {
                id: '9',
                text: 'Купите у меня оранжевые, дешево',
                sender: {
                    id: '9',
                    name: 'Алекс вы абсолютно непримемлимы',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                    chip: PlayerChip.THIMBLE,
                    role: UserRole.REGULAR
                },
                sentTime: '14:06'
            },
            {
                id: '10',
                text: 'Ты уже все проиграл, Алекс',
                sender: {
                    id: '3',
                    name: 'Русец отсосской кратодемии',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGB3V-tAqVQV4bwaakhE54_sbT_MBKBX1Pv4pTktsdsILoyR46',
                    chip: PlayerChip.HAT,
                    role: UserRole.REGULAR
                },
                sentTime: '14:06'
            },
            {
                id: '11',
                text: 'Я вас всех обыграю, ждите',
                sender: {
                    id: '4',
                    name: 'Sn1k',
                    avatarUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrg-RoaiWeDBlA0VQcaAHtgvpzsrUaLHaZsJSOxQ2Tz1ITjK6x',
                    chip: PlayerChip.IRON,
                    role: UserRole.REGULAR
                },
                sentTime: '14:07'
            },
            {
                id: '12',
                text: 'Опять телега последняя...',
                sender: {
                    id: '1',
                    name: 'видеокал-',
                    avatarUrl: 'https://avatars.mds.yandex.net/get-shedevrum/11511289/f64db62ec6d411eebe70aa2339796401/orig',
                    chip: PlayerChip.CART,
                    role: UserRole.REGULAR
                },
                sentTime: '14:08'
            },
            {
                id: '13',
                text: 'Кто следующий? Шляпа или наперсток?',
                sender: {
                    id: '2',
                    name: 'Koka',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                    chip: PlayerChip.PENGUIN,
                    role: UserRole.REGULAR
                },
                sentTime: '14:08'
            },
            {
                id: '14',
                text: 'Я уже 10 минут жду своего хода!',
                sender: {
                    id: '9',
                    name: 'Алекс вы абсолютно непримемлимы',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                    chip: PlayerChip.THIMBLE,
                    role: UserRole.REGULAR
                },
                sentTime: '14:09'
            },
            {
                id: '15',
                text: 'Все свободны, я банкрот',
                sender: {
                    id: '3',
                    name: 'Русец отсосской кратодемии',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGB3V-tAqVQV4bwaakhE54_sbT_MBKBX1Pv4pTktsdsILoyR46',
                    chip: PlayerChip.HAT,
                    role: UserRole.REGULAR
                },
                sentTime: '14:10'
            }
        ],
        builds: {
            housesCount: 8,
            hotelsCount: 8
        },
        createdAt: '08.08.2025'
    },
}

const gamesSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        pushMessage(state, action: PayloadAction<GameChatMessageT>) {
            state.currentGame.chatMessages.push(action.payload)
        }
    }
})

export const { pushMessage } = gamesSlice.actions;

export default gamesSlice.reducer;