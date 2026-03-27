import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import HighlightCard from "../../HighlightCard";
import { PERSONAL_DATA } from "../../../config/personalData.config";
import GitHubService, { Repository } from "../../../services/githubService";
import { getGitHubConfig } from "../../../config/github.config";
import { formatGithubProjectData } from "../../../utils/githubUtils";

const ProjectsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 1.5rem;
  color: #88c0d0;
  font-weight: 600;
  border-bottom: 2px solid rgba(136, 192, 208, 0.3);
  padding-bottom: 8px;
`;

const ProjectsTab: React.FC = () => {
  const { projects } = PERSONAL_DATA;
  const [githubProjects, setGithubProjects] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGithubProjects = async () => {
      try {
        setLoading(true);
        const config = getGitHubConfig();
        const githubService = new GitHubService(config);

        const pinnedRepos = await githubService.getPinnedRepositories();
        setGithubProjects(pinnedRepos);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch GitHub projects:", err);
        setError(
          "Failed to load GitHub projects. Please check your connection and GitHub token."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGithubProjects();
  }, []);

  const formatProjectData = (repo: Repository) => formatGithubProjectData(repo);

  return (
    <Fragment>
      <SectionTitle>{projects.value}</SectionTitle>

      {/* Static projects from config */}
      {projects.data && (
        <ProjectsSection>
          {projects.data.map(data => (
            <HighlightCard
              key={data.value}
              style={{
                background:
                  "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
                border: "1px solid rgba(136, 192, 208, 0.25)",
              }}
              {...data}
            />
          ))}
        </ProjectsSection>
      )}

      {/* Dynamic GitHub projects */}
      {githubProjects.length > 0 && (
        <Fragment>
          <SectionTitle
            style={{ marginTop: "32px", fontSize: "1.25rem", color: "#A3BE8C" }}
          >
            Featured GitHub Projects
          </SectionTitle>
          <ProjectsSection>
            {githubProjects.map(repo => (
              <HighlightCard key={repo.name} {...formatProjectData(repo)} />
            ))}
          </ProjectsSection>
        </Fragment>
      )}

      {/* Loading state */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            color: "#88C0D0",
            fontStyle: "italic",
            padding: "20px",
          }}
        >
          Loading GitHub projects...
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          style={{
            color: "#BF616A",
            padding: "10px",
            backgroundColor: "rgba(191, 97, 106, 0.1)",
            border: "1px solid rgba(191, 97, 106, 0.3)",
            borderRadius: "4px",
            margin: "10px 0",
          }}
        >
          {error}
        </div>
      )}
    </Fragment>
  );
};

export default ProjectsTab;
