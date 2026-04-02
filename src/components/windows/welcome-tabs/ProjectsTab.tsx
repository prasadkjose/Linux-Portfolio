import React, { Fragment } from "react";
import styled from "styled-components";
import HighlightCard from "../../HighlightCard";
import { PERSONAL_DATA } from "../../../config/personalData.config";
import GitHubService, { Repository } from "../../../services/githubService";
import { getGitHubConfig } from "../../../config/github.config";
import { formatGithubProjectData } from "../../../utils/githubUtils";
import { useQuery } from "@tanstack/react-query";

const ProjectsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 16px 0;
  font-size: 1.5rem;
  color: #99ddcc;
  font-weight: 600;
  border-bottom: 2px solid rgba(136, 192, 208, 0.3);
  padding-bottom: 8px;
`;

const ProjectsTab: React.FC = () => {
  const { projects } = PERSONAL_DATA;

  const {
    data: githubProjects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["github-projects"],
    queryFn: async () => {
      const config = getGitHubConfig();
      const githubService = new GitHubService(config);
      return await githubService.getPinnedRepositories();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const formatProjectData = (repo: Repository) => formatGithubProjectData(repo);

  return (
    <Fragment>
      <SectionTitle>
        {projects.value}
        <img
          src={PERSONAL_DATA.personalInfo.logo}
          alt={PERSONAL_DATA.personalInfo.name}
          height="35"
        />
      </SectionTitle>

      {/* Static projects from config - shown when API fails or no GitHub projects */}
      {(!githubProjects || isError || githubProjects?.length === 0) &&
        projects.data && (
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
      {githubProjects && githubProjects.length > 0 && (
        <Fragment>
          <ProjectsSection>
            {githubProjects.map(repo => (
              <HighlightCard key={repo.name} {...formatProjectData(repo)} />
            ))}
          </ProjectsSection>
        </Fragment>
      )}

      {/* Loading state */}
      {isLoading && (
        <div
          style={{
            textAlign: "center",
            color: "#99ddcc",
            fontStyle: "italic",
            padding: "20px",
          }}
        >
          Loading GitHub projects...
        </div>
      )}
    </Fragment>
  );
};

export default ProjectsTab;
