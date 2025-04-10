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
        image: "/images/problems/flat-tire.svg"
      },
      { 
        value: "BRAKE_ISSUES", 
        label: "Brake Issues",
        image: "/images/problems/brake-issues.svg"
      },
      { 
        value: "CHAIN_ISSUES", 
        label: "Chain Issues",
        image: "/images/problems/chain-issues.svg"
      },
      { 
        value: "GEAR_ISSUES", 
        label: "Gear Issues",
        image: "/images/problems/gear-issues.svg"
      },
      { 
        value: "WHEEL_ALIGNMENT", 
        label: "Wheel Alignment",
        image: "/images/problems/wheel-alignment.svg"
      },
      { 
        value: "FRAME_DAMAGE", 
        label: "Frame Damage",
        image: "/images/problems/frame-damage.svg"
      },
      { 
        value: "SADDLE_ISSUES", 
        label: "Saddle Issues",
        image: "/images/problems/saddle-issues.svg"
      },
      { 
        value: "HANDLEBAR_ISSUES", 
        label: "Handlebar Issues",
        image: "/images/problems/handlebar-issues.svg"
      },
      { 
        value: "PEDAL_ISSUES", 
        label: "Pedal Issues",
        image: "/images/problems/pedal-issues.svg"
      },
      { 
        value: "OTHER", 
        label: "Other",
        image: "/images/problems/other.svg"
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