import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seeding...')

  // Check if problem types already exist
  const existingProblemTypes = await prisma.problemType.count()
  
  if (existingProblemTypes === 0) {
    console.log('Seeding problem types...')
    
    // Define the problem types to seed
    const problemTypes = [
      { 
        value: "FLAT_TIRE", 
        label: "Flat Tire",
        image: "/images/problems/flat-tire.svg",
        index: 1
      },
      { 
        value: "BRAKE_ISSUES", 
        label: "Brake Issues",
        image: "/images/problems/brake-issues.svg",
        index: 2
      },
      { 
        value: "CHAIN_ISSUES", 
        label: "Chain Issues",
        image: "/images/problems/chain-issues.svg",
        index: 3
      },
      { 
        value: "GEAR_ISSUES", 
        label: "Gear Issues",
        image: "/images/problems/gear-issues.svg",
        index: 4
      },
      { 
        value: "WHEEL_ALIGNMENT", 
        label: "Wheel Alignment",
        image: "/images/problems/wheel-alignment.svg",
        index: 5
      },
      { 
        value: "FRAME_DAMAGE", 
        label: "Frame Damage",
        image: "/images/problems/frame-damage.svg",
        index: 6
      },
      { 
        value: "SADDLE_ISSUES", 
        label: "Saddle Issues",
        image: "/images/problems/saddle-issues.svg",
        index: 7
      },
      { 
        value: "HANDLEBAR_ISSUES", 
        label: "Handlebar Issues",
        image: "/images/problems/handlebar-issues.svg",
        index: 8
      },
      { 
        value: "PEDAL_ISSUES", 
        label: "Pedal Issues",
        image: "/images/problems/pedal-issues.svg",
        index: 9
      },
      { 
        value: "OTHER", 
        label: "Other",
        image: "/images/problems/other.svg",
        index: 10
      },
    ]

    // Create the problem types
    for (const problemType of problemTypes) {
      await prisma.problemType.create({
        data: problemType,
      })
    }

    console.log('Problem types seeded successfully!')
  } else {
    console.log('Problem types already exist, skipping seeding.')
  }

  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 