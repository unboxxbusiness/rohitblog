import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';

export const runtime = 'nodejs'; // Required to use fs in getPostBySlug

export const alt = 'LearnCode With RK blog post';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: '#0a0a0a',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          LearnCode With RK
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          color: 'white',
          position: 'relative',
          border: '12px solid #D4AF37', // Gold border
        }}
      >
        {/* Decorative background element */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            fontSize: '120px',
            color: 'rgba(255, 255, 255, 0.03)',
            fontWeight: 'bold',
          }}
        >
          {post.persona?.toUpperCase() || 'EXPERT'}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              background: '#FF1493', // Hot Pink
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            {post.content_category || 'TUTORIAL'}
          </div>
        </div>

        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            lineHeight: 1.1,
            marginBottom: '40px',
            maxWidth: '900px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {post.meta_title?.split(' | ')[0] || post.title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'black',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              color: '#D4AF37', // Gold
            }}
          >
            LearnCode With RK
          </div>
          <div
            style={{
              marginLeft: '20px',
              width: '200px',
              height: '2px',
              background: '#D4AF37',
              opacity: 0.5,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
