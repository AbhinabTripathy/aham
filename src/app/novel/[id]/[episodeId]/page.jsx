'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Paper, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

// Commented out static data - now fetching from API
/*
import paika from '../../../assets/images/Paika.png';
import previewMain from '../../../assets/images/Preview Main.png';
import preview1 from '../../../assets/images/Previw1.jpeg';
import preview2 from '../../../assets/images/Preview 2.jpeg';
import preview3 from '../../../assets/images/Preview 3.jpeg';
import preview4 from '../../../assets/images/Preview 4.jpeg';
import preview5 from '../../../assets/images/Preview 5.jpeg';
import preview6 from '../../../assets/images/Preview 6.jpeg';
import preview7 from '../../../assets/images/Preview 7.jpeg';

const episodes = [
  { id: 1, num: 1, title: 'Gajapati Legacy', img: paika.src },
  { id: 2, num: 2, title: 'The Siege of Sovereignty', img: paika.src },
  { id: 3, num: 3, title: "The Rajguru's Wrath", img: paika.src },
  { id: 4, num: 4, title: 'The Oppression of Empire', img: paika.src },
  { id: 5, num: 5, title: 'The Making of a Rebel', img: paika.src },
  { id: 6, num: 6, title: 'The Rebellion Erupts', img: paika.src },
  { id: 7, num: 7, title: 'The People Rise', img: paika.src },
  { id: 8, num: 8, title: 'The Aftermath Begins', img: paika.src },
  { id: 9, num: 9, title: 'Guerrilla Years', img: paika.src },
  { id: 10, num: 10, title: 'The End and the Echo', img: paika.src },
];
*/

export default function EpisodeReaderPage() {
  const router = useRouter();
  const params = useParams();
  const [episodeData, setEpisodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pdfError, setPdfError] = useState(null);
  const [showFallback, setShowFallback] = useState(false);

  // Helper function to construct full image URL
  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `https://api.ahamcore.com${path}`;
  };

  // PDF document load success handler
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfError(null);
    console.log('✅ PDF loaded successfully with', numPages, 'pages');
  };

  // PDF document load error handler
  const onDocumentLoadError = (error) => {
    console.error('❌ PDF load error:', error);
    // Show fallback after error
    setTimeout(() => setShowFallback(true), 1000);
  };

  // Set fallback timeout in case react-pdf is slow
  useEffect(() => {
    if (episodeData?.pdfPath && !numPages) {
      const timer = setTimeout(() => {
        if (!numPages) {
          console.log('📄 React-PDF taking too long, showing fallback');
          setShowFallback(true);
        }
      }, 8000); // 8 second timeout

      return () => clearTimeout(timer);
    }
  }, [episodeData?.pdfPath, numPages]);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        setLoading(true);
        console.log('Fetching episode data...');
        console.log('Graphic Novel ID:', params.id);
        console.log('Episode ID:', params.episodeId);
        
        const apiUrl = `https://api.ahamcore.com/api/graphic-novels/${params.id}/episodes/${params.episodeId}`;
        console.log('API URL:', apiUrl);
        
        const response = await axios.get(apiUrl);
        console.log('🔥 Full API Response:', response);
        console.log('🔥 Response Data:', response.data);
        console.log('🔥 Response Status:', response.status);
        
        // Extract the episode data based on your API structure
        let episodeData = null;
        
        if (response.data.data && response.data.data.episode) {
          episodeData = response.data.data.episode;
          console.log('✅ Found episode data in response.data.data.episode');
        } else if (response.data.episode) {
          episodeData = response.data.episode;
          console.log('✅ Found episode data in response.data.episode');
        } else if (response.data.data) {
          episodeData = response.data.data;
          console.log('✅ Found episode data in response.data.data');
        } else {
          episodeData = response.data;
          console.log('✅ Using response.data directly');
        }
        
        console.log('🎯 Final Episode Data:', episodeData);
        console.log('🎯 Episode Number from API:', episodeData?.episodeNumber);
        console.log('🎯 Episode Title from API:', episodeData?.title);
        
        setEpisodeData(episodeData);
        setError(null);
      } catch (err) {
        console.error('❌ API Error:', err);
        console.error('❌ Error Response:', err.response);
        console.error('❌ Error Status:', err.response?.status);
        console.error('❌ Error Data:', err.response?.data);
        setError(`Failed to load episode data: ${err.response?.status || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (params.id && params.episodeId) {
      fetchEpisodeData();
    }
  }, [params.id, params.episodeId]);

  // Loading state
  if (loading) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Box sx={{ maxWidth: 480, mx: 'auto', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '100vh', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Alert severity="error" sx={{ mb: 2, maxWidth: 400 }}>
            {error}
          </Alert>
          <IconButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }

  // No data state
  if (!episodeData) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Box sx={{ maxWidth: 480, mx: 'auto', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '100vh', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Alert severity="warning" sx={{ mb: 2, maxWidth: 400 }}>
            Episode not found.
          </Alert>
          <IconButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Main Content */}
      <Box sx={{ maxWidth: 480, mx: 'auto', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Paper
          elevation={3}
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'linear-gradient(45deg, #1A237E 0%, #283593 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 0,
          }}
        >
          <IconButton onClick={() => router.back()} sx={{ color: 'white' }}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}>
              {episodeData?.graphicNovel?.title || 'Episode'} - Episode {episodeData?.episodeNumber || params.episodeId}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.8rem' }}>
              {episodeData?.title || `Episode ${episodeData?.episodeNumber || params.episodeId}`}
            </Typography>
          </Box>
        </Paper>
        
                                <Box sx={{ 
                          overflowY: 'auto', 
                          flex: 1,
                          willChange: 'scroll-position',
                          transform: 'translateZ(0)',
                          contain: 'layout style paint',
                          backfaceVisibility: 'hidden'
                        }}>
          
          
          {(() => {
            if (!episodeData) {
              return (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="error" sx={{ mb: 2 }}>
                    ❌ No episode data received from API
                  </Typography>
                </Box>
              );
            }

            // Try different possible field names for pages
            const pages = episodeData.pages || 
                         episodeData.comicPages || 
                         episodeData.images || 
                         episodeData.content || 
                         episodeData.pageImages ||
                         [];
            
            console.log('🔍 Searching for pages in episode data...');
            console.log('🔍 episodeData.pages:', episodeData.pages);
            console.log('🔍 episodeData.comicPages:', episodeData.comicPages);
            console.log('🔍 episodeData.images:', episodeData.images);
            console.log('🔍 episodeData.content:', episodeData.content);
            console.log('🔍 Found pages array:', pages);
            console.log('🔍 Pages length:', pages?.length);
            
            if (pages && Array.isArray(pages) && pages.length > 0) {
              console.log('✅ Rendering', pages.length, 'pages');
              return (
                <Box>
                  <Typography sx={{ p: 2, bgcolor: '#e8f5e8', color: '#2e7d2e' }}>
                    ✅ Found {pages.length} pages for Episode {episodeData?.episodeNumber || params.episodeId}
                  </Typography>
                  {pages.map((page, index) => {
                    const imageUrl = getImageUrl(page.imagePath || page.image || page.url || page.src || page.path);
                    console.log(`📄 Page ${index + 1} URL:`, imageUrl);
                    return (
                      <img
                        key={page.id || index}
                        src={imageUrl}
                        alt={`Page ${index + 1}`}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        onError={(e) => {
                          console.error('❌ Failed to load image:', e.target.src);
                          e.target.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log('✅ Successfully loaded image:', imageUrl);
                        }}
                      />
                    );
                  })}
                </Box>
              );
                        } else if (episodeData.pdfPath) {
              const pdfUrl = getImageUrl(episodeData.pdfPath);
              console.log('📄 PDF URL:', pdfUrl);
              
              return (
                <Box sx={{ 
                  width: '100%', 
                  height: '100vh',
                  bgcolor: '#2C2C54',
                  display: 'flex',
                  flexDirection: 'column'
                }}>


                  {/* Full-Screen PDF Content - Show Complete Data */}
                  <Box sx={{ 
                    width: '100%',
                    flex: 1,
                    bgcolor: '#2C2C54',
                    overflow: 'auto',
                    padding: '0',
                    scrollBehavior: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    willChange: 'scroll-position',
                    transform: 'translateZ(0)',
                    contain: 'layout style paint',
                    backfaceVisibility: 'hidden'
                  }}>
                    {/* Show fallback iframe if react-pdf fails or takes too long */}
                    {showFallback ? (
                      <Box sx={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0',
                        margin: '0'
                      }}>
                        <iframe
                          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&page=1&zoom=page-fit`}
                          width="100%"
                          height="100%"
                          style={{ 
                            border: 'none',
                            width: '100%',
                            height: '100%',
                            display: 'block'
                          }}
                          title={`Episode ${episodeData?.episodeNumber} PDF`}
                        />
                      </Box>
                    ) : (
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        padding: '0',
                        height: '100%'
                      }}>
                        <Document
                          file={pdfUrl}
                          onLoadSuccess={onDocumentLoadSuccess}
                          onLoadError={onDocumentLoadError}
                          loading={
                            <Box sx={{ 
                              width: '100%',
                              height: '300px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: '#2C2C54'
                            }}>
                              <CircularProgress size={50} />
                              <Typography variant="h6" sx={{ mt: 2 }}>
                                Loading...
                              </Typography>
                            </Box>
                          }
                          options={{
                            cMapUrl: 'https://unpkg.com/pdfjs-dist@3.4.120/cmaps/',
                            cMapPacked: true,
                            standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.4.120/standard_fonts/',
                            disableAutoFetch: true,
                            disableStream: true,
                            disableRange: true
                          }}
                        >
                          {numPages && Array.from({ length: numPages }, (_, index) => (
                            <Box 
                              key={`page_${index + 1}`}
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                                padding: '0',
                                flex: 1,
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                                contain: 'layout style paint'
                              }}
                            >
                              <Page
                                pageNumber={index + 1}
                                scale={0.8}
                                width="100%"
                                loading={
                                  <Box sx={{ 
                                    width: '100%',
                                    minHeight: 400,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: '#2C2C54',
                                    border: '1px solid #444'
                                  }}>
                                    <CircularProgress />
                                  </Box>
                                }
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                renderInteractiveForms={false}
                                optimizeMemoryUsage={true}
                                canvasBackground="transparent"
                              />
                            </Box>
                          ))}
                        </Document>
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            } else {
                return (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    {/* Episode Icon */}
                    {episodeData?.iconPath && (
                      <Box sx={{ mb: 3 }}>
                        <img
                          src={getImageUrl(episodeData.iconPath)}
                          alt={`Episode ${episodeData.episodeNumber} Icon`}
                          style={{ 
                            maxWidth: '200px', 
                            height: 'auto', 
                            border: '2px solid #ff9800', 
                            borderRadius: '12px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </Box>
                    )}
                    
                    <Typography variant="h5" color="warning.main" sx={{ mb: 2, fontWeight: 600 }}>
                      ⚠️ {episodeData?.graphicNovel?.title || 'Episode'} - Episode {episodeData?.episodeNumber || params.episodeId}
                    </Typography>
                    
                    <Typography variant="h6" color="text.primary" sx={{ mb: 3 }}>
                      No Content Available
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      This episode was found but doesn't contain pages or PDF content yet.
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      Episode ID: {episodeData?.id} | Created: {episodeData?.createdAt ? new Date(episodeData.createdAt).toLocaleDateString() : 'Unknown'}
                    </Typography>
                    
                    {process.env.NODE_ENV === 'development' && (
                      <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Available fields: {Object.keys(episodeData || {}).join(', ') || 'None'}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              }
          })()}
        </Box>
      </Box>
    </Box>
  );
} 