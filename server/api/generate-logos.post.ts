import sharp from 'sharp'

const styles: Record<string, string> = {
  geometric: 'geometric shapes, clean angles, structured, precise, mathematical symmetry',
  organic: 'organic flowing forms, natural curves, leaf or wave inspired, soft edges',
  abstract: 'abstract art inspired, bold overlapping shapes, creative negative space',
  minimal: 'ultra-minimal, single continuous line or shape, maximum simplicity',
  tech: 'futuristic tech aesthetic, circuit-inspired, sharp edges, digital feel',
  playful: 'rounded friendly shapes, approachable, bubbly, warm and inviting'
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { repoName, repoDescription, style } = await readBody(event)

  const styleDesc = styles[style] || styles.geometric

  const prompt = [
    `Generate a simple logo icon for a software project called "${repoName}".`,
    repoDescription ? `The project is: ${repoDescription}.` : '',
    `Style: ${styleDesc}.`,
    'Flat vector-style icon on a solid white background.',
    'No text, just the icon. Square aspect ratio.',
    'Professional open-source project favicon quality.'
  ].filter(Boolean).join(' ')

  const res = await $fetch<{
    choices?: { message?: { images?: { image_url: { url: string } }[] } }[]
  }>('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.openrouterApiKey}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: 'google/gemini-2.5-flash-image',
      messages: [{ role: 'user', content: prompt }],
      modalities: ['image', 'text'],
      image_config: { aspect_ratio: '1:1' }
    }
  })

  const dataUrl = res?.choices?.[0]?.message?.images?.[0]?.image_url?.url
  if (!dataUrl) throw createError({ statusCode: 502, message: 'No image returned from model' })

  const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '')
  const inputBuffer = Buffer.from(base64Data, 'base64')
  const resized = await sharp(inputBuffer).resize(512, 512).png().toBuffer()
  const logo = `data:image/png;base64,${resized.toString('base64')}`

  return { logo, style }
})
