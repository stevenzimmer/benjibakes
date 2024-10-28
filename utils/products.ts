export const products = [
    {
        id: "bb-choco-chip",
        label: "Benji Bakes' Famous",
        title: "Brown Butter Chocolate Chip Cookie",
        description:
            "Our best-seller, the Brown Butter Chocolate Chip Cookie, offers a rich twist on the classic. Made with perfectly browned butter, gooey chocolate chips, and topped with flaky sea salt, these cookies have a depth of flavor that's irresistible.",
        prices: [
            {id: "bb-choco-chip-12", number: 12, cost: 2500},
            {id: "bb-choco-chip-24", number: 24, cost: 4400},
        ],
        image: "/bb-choco-chip.png",
    },
    {
        id: "bb-monster",
        label: "Halloween Special",
        title: "Monster Cookie",
        description: `Introducing our spooktacular October special, the "Monster Cookie"! Packed with M&Ms, pretzels, oats, and chocolate chips, this sweet and salty treat is the perfect addition to your Halloween celebrations. Add them to your boo baskets for a fun and festive surprise!`,
        prices: [
            {id: "bb-monster-6", number: 6, cost: 1300},
            {id: "bb-monster-12", number: 12, cost: 2500},
        ],
        image: "/monster-cookie.png",
        special: true,
    },
    {
        id: "bb-celebration",
        label: "Rotating Favorite",
        title: "Celebration Cookie",
        description:
            "Celebrate life's sweet moments with our vibrant Celebration Cookie! Packed with colorful sprinkles and soft, chewy goodness, these cookies are the ultimate party treat. Whether it's a birthday, anniversary, or any occasion, this cookie will make every celebration sweeter.",
        prices: [
            {id: "bb-celebration-6", number: 6, cost: 1200},
            {id: "bb-celebration-12", number: 12, cost: 2300},
        ],
        image: "/celebration.png",
    },
];
