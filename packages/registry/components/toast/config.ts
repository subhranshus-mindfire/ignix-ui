// registry/components/toast/config.ts
export default {
    tailwind: {
      keyframes: {
        toastIn: {
          from: { 
            opacity: '0',
            transform: 'translateY(20px) scale(0.8)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          }
        },
        toastOut: {
          from: {
            opacity: '1',
            transform: 'scale(1)'
          },
          to: {
            opacity: '0',
            transform: 'translateY(20px) scale(0.8)'
          }
        }
      },
      animation: {
        toastIn: 'toastIn 0.4s ease-out',
        toastOut: 'toastOut 0.4s ease-in'
      }
    }
  };