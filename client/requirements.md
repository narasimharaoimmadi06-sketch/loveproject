## Packages
react-dropzone | File drag and drop functionality
framer-motion | Smooth transitions between upload/converting/success states
canvas-confetti | Delightful success animation
@types/canvas-confetti | Types for canvas-confetti
lucide-react | High quality icons for tools

## Notes
- API expects `multipart/form-data` with `files` and `tool`
- Tool names must exactly match expected backend strings: 'images-to-pdf', 'pdf-to-image', 'pdf-to-word', 'pdf-merge', 'compress-pdf'
- Polling implementation relies on TanStack Query v5 `refetchInterval` function signature
